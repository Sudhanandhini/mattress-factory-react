const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @desc    Get reviews for a product
 * @route   GET /api/reviews/product/:productId
 * @access  Public
 */
exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: { productId, isApproved: true },
        include: {
          user: {
            select: { id: true, firstName: true, lastName: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit),
      }),
      prisma.review.count({ where: { productId, isApproved: true } }),
    ]);

    // Rating summary
    const allRatings = await prisma.review.groupBy({
      by: ['rating'],
      where: { productId, isApproved: true },
      _count: { rating: true },
    });

    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    allRatings.forEach(({ rating, _count }) => {
      ratingCounts[rating] = _count.rating;
    });

    const avgRating =
      total > 0
        ? allRatings.reduce((sum, r) => sum + r.rating * r._count.rating, 0) / total
        : 0;

    res.json({
      success: true,
      data: {
        reviews,
        summary: {
          total,
          avgRating: Math.round(avgRating * 10) / 10,
          ratingCounts,
        },
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    console.error('Get product reviews error:', error);
    res.status(500).json({ success: false, message: 'Error fetching reviews', error: error.message });
  }
};

/**
 * @desc    Create a review
 * @route   POST /api/reviews
 * @access  Private
 */
exports.createReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, rating, title, comment } = req.body;

    if (!productId || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'productId, rating and comment are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    // Check product exists
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Prevent duplicate review
    const existing = await prisma.review.findFirst({ where: { productId, userId } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this product' });
    }

    // Mark as verified if the user has a delivered order containing this product
    const verifiedOrder = await prisma.orderItem.findFirst({
      where: {
        productId,
        order: { userId, status: 'DELIVERED' },
      },
    });

    const review = await prisma.review.create({
      data: {
        productId,
        userId,
        rating: parseInt(rating),
        title: title || null,
        comment,
        isVerified: !!verifiedOrder,
        isApproved: false, // Admin must approve
      },
      include: {
        user: { select: { id: true, firstName: true, lastName: true } },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Review submitted and pending approval',
      data: review,
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ success: false, message: 'Error creating review', error: error.message });
  }
};

/**
 * @desc    Update own review
 * @route   PUT /api/reviews/:id
 * @access  Private
 */
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { rating, title, comment } = req.body;

    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    if (review.userId !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this review' });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    const updated = await prisma.review.update({
      where: { id },
      data: {
        ...(rating && { rating: parseInt(rating) }),
        ...(title !== undefined && { title }),
        ...(comment && { comment }),
        isApproved: false, // Reset approval after edit
      },
      include: {
        user: { select: { id: true, firstName: true, lastName: true } },
      },
    });

    res.json({ success: true, message: 'Review updated and pending re-approval', data: updated });
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({ success: false, message: 'Error updating review', error: error.message });
  }
};

/**
 * @desc    Delete own review (or admin deletes any)
 * @route   DELETE /api/reviews/:id
 * @access  Private
 */
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const isAdmin = req.user.role === 'ADMIN';

    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    if (!isAdmin && review.userId !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this review' });
    }

    await prisma.review.delete({ where: { id } });

    res.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ success: false, message: 'Error deleting review', error: error.message });
  }
};

/**
 * @desc    Admin: get all reviews (including unapproved)
 * @route   GET /api/reviews/admin
 * @access  Admin
 */
exports.getAllReviews = async (req, res) => {
  try {
    const { page = 1, limit = 20, approved } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = approved !== undefined ? { isApproved: approved === 'true' } : {};

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        include: {
          user: { select: { id: true, firstName: true, lastName: true, email: true } },
          product: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit),
      }),
      prisma.review.count({ where }),
    ]);

    res.json({
      success: true,
      data: reviews,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get all reviews error:', error);
    res.status(500).json({ success: false, message: 'Error fetching reviews', error: error.message });
  }
};

/**
 * @desc    Admin: approve or reject a review
 * @route   PATCH /api/reviews/:id/approve
 * @access  Admin
 */
exports.approveReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body;

    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    const updated = await prisma.review.update({
      where: { id },
      data: { isApproved: Boolean(isApproved) },
    });

    res.json({
      success: true,
      message: isApproved ? 'Review approved' : 'Review rejected',
      data: updated,
    });
  } catch (error) {
    console.error('Approve review error:', error);
    res.status(500).json({ success: false, message: 'Error updating review', error: error.message });
  }
};

module.exports = exports;
