const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @desc    Get all categories
 * @route   GET /api/categories
 * @access  Public
 */
exports.getCategories = async (req, res) => {
  try {
    const { includeProducts = false } = req.query;

    const categories = await prisma.category.findMany({
      where: { isActive: true },
      include: {
        children: true,
        _count: includeProducts === 'true' ? { select: { products: true } } : false,
      },
      orderBy: { sortOrder: 'asc' },
    });

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single category
 * @route   GET /api/categories/:id
 * @access  Public
 */
exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        children: true,
        parent: true,
        _count: { select: { products: true } },
      },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching category',
      error: error.message,
    });
  }
};

/**
 * @desc    Get category by slug
 * @route   GET /api/categories/slug/:slug
 * @access  Public
 */
exports.getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        children: true,
        parent: true,
        _count: { select: { products: true } },
      },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error('Get category by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching category',
      error: error.message,
    });
  }
};

/**
 * @desc    Get category products
 * @route   GET /api/categories/:id/products
 * @access  Public
 */
exports.getCategoryProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      page = 1,
      limit = 12,
      minPrice,
      maxPrice,
      sort = 'createdAt',
      order = 'desc',
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {
      categoryId: id,
      status: 'ACTIVE',
    };

    if (minPrice || maxPrice) {
      where.discountPrice = {};
      if (minPrice) where.discountPrice.gte = parseFloat(minPrice);
      if (maxPrice) where.discountPrice.lte = parseFloat(maxPrice);
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: parseInt(limit),
        include: {
          images: {
            orderBy: { sortOrder: 'asc' },
          },
          variants: true,
        },
        orderBy: { [sort]: order },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalItems: total,
        },
      },
    });
  } catch (error) {
    console.error('Get category products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching category products',
      error: error.message,
    });
  }
};

/**
 * @desc    Create category
 * @route   POST /api/categories
 * @access  Private/Admin
 */
exports.createCategory = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      image,
      parentId,
      metaTitle,
      metaDescription,
      sortOrder,
    } = req.body;

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        image,
        parentId,
        metaTitle,
        metaDescription,
        sortOrder: sortOrder || 0,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating category',
      error: error.message,
    });
  }
};

/**
 * @desc    Update category
 * @route   PUT /api/categories/:id
 * @access  Private/Admin
 */
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const category = await prisma.category.update({
      where: { id },
      data: updateData,
    });

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: category,
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating category',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete category
 * @route   DELETE /api/categories/:id
 * @access  Private/Admin
 */
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category has products
    const productCount = await prisma.product.count({
      where: { categoryId: id },
    });

    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete category with products. Please reassign products first.',
      });
    }

    await prisma.category.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting category',
      error: error.message,
    });
  }
};

module.exports = exports;
