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
 * @desc    Create order (inline cart + address from frontend)
 * @route   POST /api/orders
 * @access  Private
 */
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      name,
      phone,
      email,
      address,
      city,
      state,
      pincode,
      notes,
      items,
      subtotal: clientSubtotal,
      tax: clientTax,
      total: clientTotal,
    } = req.body;

    if (!name || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone and address are required',
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item',
      });
    }

    // Build order items from frontend cart
    const orderItems = items.map(item => ({
      productId:   item.productId,
      variantId:   item.variantId || null,
      productName: item.productName,
      variantName: item.variantLabel || null,
      quantity:    item.quantity,
      price:       item.price,
      total:       item.price * item.quantity,
    }));

    const subtotal    = parseFloat(clientSubtotal) || orderItems.reduce((s, i) => s + i.total, 0);
    const tax         = parseFloat(clientTax)      || Math.round(subtotal * 0.18);
    const shippingCharge = 0;
    const total       = parseFloat(clientTotal)    || subtotal + tax;

    const orderNumber = generateOrderNumber();

    // Create (or reuse) an Address record from inline data
    const savedAddress = await prisma.address.create({
      data: {
        userId,
        fullName:     name,
        phone,
        addressLine1: address,
        city:         city    || '',
        state:        state   || '',
        pincode:      pincode || '',
        type:         'HOME',
      },
    });

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        shippingAddressId: savedAddress.id,
        subtotal,
        discount:      0,
        shippingCharge,
        tax,
        total,
        paymentMethod: 'COD',
        customerNotes: notes || null,
        adminNotes: email ? `Email: ${email}` : null,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    });

    // Add status history
    await prisma.orderStatusHistory.create({
      data: {
        orderId: order.id,
        status:  'PENDING',
        notes:   'Order placed by customer',
      },
    });

    // Send confirmation email (non-blocking)
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (user?.email) {
        await emailService.sendOrderConfirmationEmail(
          user.email,
          user.firstName,
          orderNumber,
          { items: order.items, total }
        );
      }
    } catch (mailErr) {
      console.error('Order email error (non-fatal):', mailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: { orderNumber: order.orderNumber, id: order.id },
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
