const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @desc    Get all products with filters
 * @route   GET /api/products
 * @access  Public
 */
exports.getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      minPrice,
      maxPrice,
      size,
      search,
      sort = 'createdAt',
      order = 'desc',
      status,
      isFeatured,
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build where clause
    const where = {};

    if (category) {
      where.categories = { some: { categoryId: category } };
    }

    if (status) {
      where.status = status;
    } else {
      where.status = 'ACTIVE'; // Default: only show active products
    }

    if (isFeatured === 'true') {
      where.isFeatured = true;
    }

    if (minPrice || maxPrice) {
      where.discountPrice = {};
      if (minPrice) where.discountPrice.gte = parseFloat(minPrice);
      if (maxPrice) where.discountPrice.lte = parseFloat(maxPrice);
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    // Get products
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: parseInt(limit),
        include: {
          categories: {
            include: {
              category: { select: { id: true, name: true, slug: true } },
            },
          },
          images: {
            orderBy: { sortOrder: 'asc' },
          },
          variants: {
            where: { isActive: true },
            orderBy: { price: 'asc' },
          },
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
          itemsPerPage: parseInt(limit),
        },
      },
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single product
 * @route   GET /api/products/:id
 * @access  Public
 */
exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        categories: { include: { category: true } },
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        variants: {
          where: { isActive: true },
        },
        reviews: {
          where: { isApproved: true },
          include: {
            user: {
              select: { id: true, firstName: true, lastName: true },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Increment view count
    await prisma.product.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message,
    });
  }
};

/**
 * @desc    Get product by slug
 * @route   GET /api/products/slug/:slug
 * @access  Public
 */
exports.getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        categories: { include: { category: true } },
        images: { orderBy: { sortOrder: 'asc' } },
        variants: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
        },
        specifications: { orderBy: { sortOrder: 'asc' } },
        badges: { orderBy: { sortOrder: 'asc' } },
        freebies: { orderBy: { sortOrder: 'asc' } },
        reviews: {
          where: { isApproved: true },
          include: {
            user: { select: { id: true, firstName: true, lastName: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Increment view count
    await prisma.product.update({
      where: { slug },
      data: { viewCount: { increment: 1 } },
    });

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Get product by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message,
    });
  }
};

/**
 * @desc    Create product
 * @route   POST /api/products
 * @access  Private/Admin
 */
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      shortDescription,
      categoryId,
      basePrice,
      discountPercent,
      sku,
      stock,
      brand,
      material,
      warranty,
      features,
      specifications,
      status,
      isFeatured,
      isNewArrival,
      variants,
      images,
    } = req.body;

    // Calculate discount price
    const discountPrice = discountPercent
      ? basePrice - (basePrice * discountPercent) / 100
      : null;

    // Create product with images and variants
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        shortDescription,
        categoryId,
        basePrice: parseFloat(basePrice),
        discountPercent: parseInt(discountPercent) || 0,
        discountPrice: discountPrice ? parseFloat(discountPrice) : null,
        sku,
        stock: parseInt(stock) || 0,
        brand,
        material,
        warranty,
        features,
        specifications,
        status: status || 'ACTIVE',
        isFeatured: isFeatured || false,
        isNewArrival: isNewArrival || false,
        images: images
          ? {
              create: images.map((img, index) => ({
                url: img.url,
                altText: img.altText || name,
                sortOrder: img.sortOrder || index,
                isPrimary: img.isPrimary || index === 0,
              })),
            }
          : undefined,
        variants: variants
          ? {
              create: variants.map((v) => ({
                size: v.size,
                thickness: v.thickness,
                price: parseFloat(v.price),
                discountPrice: v.discountPrice
                  ? parseFloat(v.discountPrice)
                  : null,
                sku: v.sku,
                stock: parseInt(v.stock) || 0,
                color: v.color,
                weight: v.weight,
              })),
            }
          : undefined,
      },
      include: {
        category: true,
        images: true,
        variants: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message,
    });
  }
};

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Calculate discount price if needed
    if (updateData.basePrice && updateData.discountPercent) {
      updateData.discountPrice =
        updateData.basePrice -
        (updateData.basePrice * updateData.discountPercent) / 100;
    }

    // Remove nested data for separate updates
    delete updateData.images;
    delete updateData.variants;
    delete updateData.category;

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        images: true,
        variants: true,
      },
    });

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message,
    });
  }
};

/**
 * @desc    Add product images
 * @route   POST /api/products/:id/images
 * @access  Private/Admin
 */
exports.addProductImages = async (req, res) => {
  try {
    const { id } = req.params;
    const { images } = req.body;

    const createdImages = await Promise.all(
      images.map((img, index) =>
        prisma.productImage.create({
          data: {
            productId: id,
            url: img.url,
            altText: img.altText,
            sortOrder: img.sortOrder || index,
            isPrimary: img.isPrimary || false,
          },
        })
      )
    );

    res.json({
      success: true,
      message: 'Images added successfully',
      data: createdImages,
    });
  } catch (error) {
    console.error('Add images error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding images',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete product image
 * @route   DELETE /api/products/:id/images/:imageId
 * @access  Private/Admin
 */
exports.deleteProductImage = async (req, res) => {
  try {
    const { imageId } = req.params;

    await prisma.productImage.delete({
      where: { id: imageId },
    });

    res.json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting image',
      error: error.message,
    });
  }
};

module.exports = exports;
