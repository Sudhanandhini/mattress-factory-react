const { PrismaClient } = require('@prisma/client');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const prisma = new PrismaClient();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * @desc    Create Razorpay order
 * @route   POST /api/payments/create-order
 * @access  Private
 */
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const userId = req.user.id;

    // Get order
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId,
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Check if payment already exists
    const existingPayment = await prisma.payment.findUnique({
      where: { orderId },
    });

    if (existingPayment && existingPayment.status === 'PAID') {
      return res.status(400).json({
        success: false,
        message: 'Order already paid',
      });
    }

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(parseFloat(order.total) * 100), // Amount in paise
      currency: 'INR',
      receipt: order.orderNumber,
      notes: {
        orderId: order.id,
        userId: order.userId,
      },
    });

    // Create or update payment record
    let payment;
    if (existingPayment) {
      payment = await prisma.payment.update({
        where: { id: existingPayment.id },
        data: {
          razorpayOrderId: razorpayOrder.id,
        },
      });
    } else {
      payment = await prisma.payment.create({
        data: {
          orderId: order.id,
          method: 'RAZORPAY',
          amount: order.total,
          razorpayOrderId: razorpayOrder.id,
        },
      });
    }

    res.json({
      success: true,
      data: {
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    console.error('Create Razorpay order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating payment order',
      error: error.message,
    });
  }
};

/**
 * @desc    Verify Razorpay payment
 * @route   POST /api/payments/verify
 * @access  Private
 */
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      // Payment verification failed
      await prisma.payment.update({
        where: { razorpayOrderId: razorpay_order_id },
        data: {
          status: 'FAILED',
          failureReason: 'Invalid signature',
        },
      });

      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature',
      });
    }

    // Update payment
    const payment = await prisma.payment.update({
      where: { razorpayOrderId: razorpay_order_id },
      data: {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: 'PAID',
        paidAt: new Date(),
      },
    });

    // Update order
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'PAID',
        status: 'CONFIRMED',
      },
      include: {
        user: true,
      },
    });

    // Add status history
    await prisma.orderStatusHistory.create({
      data: {
        orderId: order.id,
        status: 'CONFIRMED',
        notes: 'Payment received',
      },
    });

    // Send email notification (optional)
    // await emailService.sendOrderConfirmationEmail(order.user.email, ...);

    res.json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        paymentStatus: payment.status,
      },
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.message,
    });
  }
};

/**
 * @desc    Create COD order
 * @route   POST /api/payments/cod
 * @access  Private
 */
exports.createCODOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const userId = req.user.id;

    // Check if COD is enabled
    if (process.env.COD_ENABLED !== 'true') {
      return res.status(400).json({
        success: false,
        message: 'Cash on Delivery is not available',
      });
    }

    // Get order
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId,
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Check COD limit
    const codMaxValue = parseFloat(process.env.COD_MAX_ORDER_VALUE) || 50000;
    if (parseFloat(order.total) > codMaxValue) {
      return res.status(400).json({
        success: false,
        message: `COD not available for orders above ₹${codMaxValue}`,
      });
    }

    // Create payment record
    await prisma.payment.create({
      data: {
        orderId: order.id,
        method: 'COD',
        amount: order.total,
        status: 'PENDING',
      },
    });

    // Update order
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentMethod: 'COD',
        status: 'CONFIRMED',
      },
    });

    // Add status history
    await prisma.orderStatusHistory.create({
      data: {
        orderId: order.id,
        status: 'CONFIRMED',
        notes: 'COD order confirmed',
      },
    });

    res.json({
      success: true,
      message: 'COD order confirmed',
      data: {
        orderId: order.id,
        orderNumber: order.orderNumber,
      },
    });
  } catch (error) {
    console.error('COD order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating COD order',
      error: error.message,
    });
  }
};

/**
 * @desc    Get payment details
 * @route   GET /api/payments/:orderId
 * @access  Private
 */
exports.getPaymentDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    // Verify order belongs to user
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId,
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    const payment = await prisma.payment.findUnique({
      where: { orderId },
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }

    res.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    console.error('Get payment details error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payment details',
      error: error.message,
    });
  }
};

module.exports = exports;
