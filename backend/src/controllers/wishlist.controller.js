const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @desc    Get user wishlist
 * @route   GET /api/wishlist
 * @access  Private
 */
exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    let wishlist = await prisma.wishlist.findUnique({
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
                variants: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    // Create wishlist if doesn't exist
    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: { userId },
        include: { items: true },
      });
    }

    res.json({
      success: true,
      data: {
        wishlist,
        itemCount: wishlist.items.length,
      },
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching wishlist',
      error: error.message,
    });
  }
};

/**
 * @desc    Add item to wishlist
 * @route   POST /api/wishlist
 * @access  Private
 */
exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    // Get or create wishlist
    let wishlist = await prisma.wishlist.findUnique({
      where: { userId },
    });

    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: { userId },
      });
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check if already in wishlist
    const existingItem = await prisma.wishlistItem.findUnique({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId,
        },
      },
    });

    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: 'Product already in wishlist',
      });
    }

    // Add to wishlist
    const wishlistItem = await prisma.wishlistItem.create({
      data: {
        wishlistId: wishlist.id,
        productId,
      },
      include: {
        product: {
          include: {
            images: { where: { isPrimary: true } },
            category: true,
          },
        },
      },
    });

    res.json({
      success: true,
      message: 'Added to wishlist',
      data: wishlistItem,
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding to wishlist',
      error: error.message,
    });
  }
};

/**
 * @desc    Remove item from wishlist
 * @route   DELETE /api/wishlist/:itemId
 * @access  Private
 */
exports.removeFromWishlist = async (req, res) => {
  try {
    const { itemId } = req.params;

    await prisma.wishlistItem.delete({
      where: { id: itemId },
    });

    res.json({
      success: true,
      message: 'Removed from wishlist',
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing from wishlist',
      error: error.message,
    });
  }
};

/**
 * @desc    Move wishlist item to cart
 * @route   POST /api/wishlist/:itemId/move-to-cart
 * @access  Private
 */
exports.moveToCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user.id;

    // Get wishlist item
    const wishlistItem = await prisma.wishlistItem.findUnique({
      where: { id: itemId },
      include: { product: true },
    });

    if (!wishlistItem) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist item not found',
      });
    }

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    // Add to cart
    const price =
      wishlistItem.product.discountPrice || wishlistItem.product.basePrice;

    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: wishlistItem.productId,
        quantity: 1,
        price,
      },
    });

    // Remove from wishlist
    await prisma.wishlistItem.delete({
      where: { id: itemId },
    });

    res.json({
      success: true,
      message: 'Moved to cart successfully',
    });
  } catch (error) {
    console.error('Move to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error moving to cart',
      error: error.message,
    });
  }
};

/**
 * @desc    Check if product is in wishlist
 * @route   GET /api/wishlist/check/:productId
 * @access  Private
 */
exports.checkWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId },
    });

    if (!wishlist) {
      return res.json({
        success: true,
        data: { inWishlist: false },
      });
    }

    const item = await prisma.wishlistItem.findUnique({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId,
        },
      },
    });

    res.json({
      success: true,
      data: { inWishlist: !!item },
    });
  } catch (error) {
    console.error('Check wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking wishlist',
      error: error.message,
    });
  }
};

module.exports = exports;
