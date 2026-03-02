const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @desc    Get user cart
 * @route   GET /api/cart
 * @access  Private
 */
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  where: { isPrimary: true },
                },
                category: true,
              },
            },
            variant: true,
          },
        },
      },
    });

    // Create cart if doesn't exist
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: { items: true },
      });
    }

    // Calculate totals
    let subtotal = 0;
    cart.items.forEach((item) => {
      subtotal += parseFloat(item.price) * item.quantity;
    });

    res.json({
      success: true,
      data: {
        cart,
        summary: {
          itemCount: cart.items.length,
          subtotal,
          tax: subtotal * 0.18, // 18% GST
          total: subtotal * 1.18,
        },
      },
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching cart',
      error: error.message,
    });
  }
};

/**
 * @desc    Add item to cart
 * @route   POST /api/cart
 * @access  Private
 */
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, variantId, quantity = 1 } = req.body;

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    // Get product details
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { variants: true },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check stock
    const stock = variantId
      ? product.variants.find((v) => v.id === variantId)?.stock
      : product.stock;

    if (!stock || stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock',
      });
    }

    // Get price
    let price;
    if (variantId) {
      const variant = product.variants.find((v) => v.id === variantId);
      price = variant.discountPrice || variant.price;
    } else {
      price = product.discountPrice || product.basePrice;
    }

    // Check if item already exists
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
        variantId: variantId || null,
      },
    });

    let cartItem;
    if (existingItem) {
      // Update quantity
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
        },
        include: {
          product: {
            include: { images: { where: { isPrimary: true } } },
          },
          variant: true,
        },
      });
    } else {
      // Add new item
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          variantId,
          quantity,
          price,
        },
        include: {
          product: {
            include: { images: { where: { isPrimary: true } } },
          },
          variant: true,
        },
      });
    }

    res.json({
      success: true,
      message: 'Item added to cart',
      data: cartItem,
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding to cart',
      error: error.message,
    });
  }
};

/**
 * @desc    Update cart item quantity
 * @route   PUT /api/cart/:itemId
 * @access  Private
 */
exports.updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1',
      });
    }

    const cartItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
      include: {
        product: true,
        variant: true,
      },
    });

    res.json({
      success: true,
      message: 'Cart updated',
      data: cartItem,
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating cart',
      error: error.message,
    });
  }
};

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/cart/:itemId
 * @access  Private
 */
exports.removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    res.json({
      success: true,
      message: 'Item removed from cart',
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing item',
      error: error.message,
    });
  }
};

/**
 * @desc    Clear cart
 * @route   DELETE /api/cart
 * @access  Private
 */
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (cart) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
    }

    res.json({
      success: true,
      message: 'Cart cleared',
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error clearing cart',
      error: error.message,
    });
  }
};

/**
 * @desc    Apply coupon code
 * @route   POST /api/cart/coupon
 * @access  Private
 */
exports.applyCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user.id;

    // Find coupon
    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Invalid coupon code',
      });
    }

    // Check if active
    if (!coupon.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Coupon is not active',
      });
    }

    // Check validity dates
    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validUntil) {
      return res.status(400).json({
        success: false,
        message: 'Coupon has expired',
      });
    }

    // Check usage limit
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({
        success: false,
        message: 'Coupon usage limit reached',
      });
    }

    // Get cart
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty',
      });
    }

    // Calculate subtotal
    let subtotal = 0;
    cart.items.forEach((item) => {
      subtotal += parseFloat(item.price) * item.quantity;
    });

    // Check minimum order value
    if (coupon.minOrderValue && subtotal < parseFloat(coupon.minOrderValue)) {
      return res.status(400).json({
        success: false,
        message: `Minimum order value of ₹${coupon.minOrderValue} required`,
      });
    }

    // Calculate discount
    let discount = 0;
    if (coupon.type === 'PERCENTAGE') {
      discount = (subtotal * parseFloat(coupon.value)) / 100;
      if (coupon.maxDiscount) {
        discount = Math.min(discount, parseFloat(coupon.maxDiscount));
      }
    } else {
      discount = parseFloat(coupon.value);
    }

    res.json({
      success: true,
      message: 'Coupon applied successfully',
      data: {
        coupon: {
          code: coupon.code,
          discount,
          type: coupon.type,
        },
        summary: {
          subtotal,
          discount,
          total: subtotal - discount,
        },
      },
    });
  } catch (error) {
    console.error('Apply coupon error:', error);
    res.status(500).json({
      success: false,
      message: 'Error applying coupon',
      error: error.message,
    });
  }
};

module.exports = exports;
