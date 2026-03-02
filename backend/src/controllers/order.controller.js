const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const emailService = require('../services/email.service');

/**
 * Generate unique order number
 */
const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  return `ORD${timestamp}${random}`;
};

/**
 * @desc    Get user orders
 * @route   GET /api/orders
 * @access  Private
 */
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10, status } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = { userId };
    if (status) where.status = status;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: parseInt(limit),
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: { where: { isPrimary: true } },
                },
              },
              variant: true,
            },
          },
          shippingAddress: true,
          payment: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalItems: total,
        },
      },
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single order
 * @route   GET /api/orders/:id
 * @access  Private
 */
exports.getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await prisma.order.findFirst({
      where: {
        id,
        userId, // Ensure user can only see their own orders
      },
      include: {
        items: {
          include: {
            product: {
              include: { images: { where: { isPrimary: true } } },
            },
            variant: true,
          },
        },
        shippingAddress: true,
        payment: true,
        statusHistory: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message,
    });
  }
};

/**
 * @desc    Create order
 * @route   POST /api/orders
 * @access  Private
 */
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      shippingAddressId,
      paymentMethod,
      couponCode,
      customerNotes,
    } = req.body;

    // Get cart
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty',
      });
    }

    // Verify shipping address
    const address = await prisma.address.findFirst({
      where: {
        id: shippingAddressId,
        userId,
      },
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Shipping address not found',
      });
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const itemTotal = parseFloat(item.price) * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: item.productId,
        variantId: item.variantId,
        productName: item.product.name,
        variantName: item.variant ? item.variant.size : null,
        quantity: item.quantity,
        price: item.price,
        total: itemTotal,
      });
    }

    // Apply coupon if provided
    let discount = 0;
    let couponDiscount = 0;
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.toUpperCase() },
      });

      if (
        coupon &&
        coupon.isActive &&
        new Date() >= coupon.validFrom &&
        new Date() <= coupon.validUntil
      ) {
        if (coupon.type === 'PERCENTAGE') {
          couponDiscount = (subtotal * parseFloat(coupon.value)) / 100;
          if (coupon.maxDiscount) {
            couponDiscount = Math.min(
              couponDiscount,
              parseFloat(coupon.maxDiscount)
            );
          }
        } else {
          couponDiscount = parseFloat(coupon.value);
        }
        discount = couponDiscount;

        // Update coupon usage
        await prisma.coupon.update({
          where: { id: coupon.id },
          data: { usedCount: { increment: 1 } },
        });
      }
    }

    // Calculate shipping
    const shippingThreshold =
      parseFloat(process.env.FREE_SHIPPING_THRESHOLD) || 5000;
    const shippingCharge =
      subtotal >= shippingThreshold
        ? 0
        : parseFloat(process.env.SHIPPING_CHARGE_BELOW_THRESHOLD) || 500;

    // Calculate tax (18% GST)
    const tax = (subtotal - discount) * 0.18;

    // Total
    const total = subtotal - discount + shippingCharge + tax;

    // Generate order number
    const orderNumber = generateOrderNumber();

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        shippingAddressId,
        subtotal,
        discount,
        shippingCharge,
        tax,
        total,
        couponCode: couponCode?.toUpperCase(),
        couponDiscount,
        paymentMethod,
        customerNotes,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        shippingAddress: true,
      },
    });

    // Add status history
    await prisma.orderStatusHistory.create({
      data: {
        orderId: order.id,
        status: 'PENDING',
        notes: 'Order created',
      },
    });

    // Clear cart
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    // Get user details for email
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Send order confirmation email
    await emailService.sendOrderConfirmationEmail(
      user.email,
      user.firstName,
      orderNumber,
      {
        items: order.items,
        total,
      }
    );

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message,
    });
  }
};

/**
 * @desc    Cancel order
 * @route   PUT /api/orders/:id/cancel
 * @access  Private
 */
exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { reason } = req.body;

    const order = await prisma.order.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Check if order can be cancelled
    if (['SHIPPED', 'DELIVERED', 'CANCELLED'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel order with status: ${order.status}`,
      });
    }

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        adminNotes: reason,
      },
    });

    // Add status history
    await prisma.orderStatusHistory.create({
      data: {
        orderId: id,
        status: 'CANCELLED',
        notes: reason || 'Cancelled by customer',
      },
    });

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: updatedOrder,
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling order',
      error: error.message,
    });
  }
};

/**
 * @desc    Track order
 * @route   GET /api/orders/:id/track
 * @access  Private
 */
exports.trackOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await prisma.order.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        statusHistory: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.json({
      success: true,
      data: {
        orderNumber: order.orderNumber,
        status: order.status,
        trackingNumber: order.trackingNumber,
        estimatedDelivery: order.estimatedDelivery,
        deliveredAt: order.deliveredAt,
        statusHistory: order.statusHistory,
      },
    });
  } catch (error) {
    console.error('Track order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error tracking order',
      error: error.message,
    });
  }
};

module.exports = exports;
