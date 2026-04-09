const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/admin/dashboard
 * @access  Private/Admin
 */
exports.getDashboardStats = async (req, res) => {
  try {
    // Get date ranges
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Get counts
    const [
      totalOrders,
      totalUsers,
      totalProducts,
      monthlyOrders,
      lastMonthOrders,
      pendingOrders,
      lowStockProducts,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.user.count({ where: { role: 'CUSTOMER' } }),
      prisma.product.count(),
      prisma.order.count({
        where: {
          createdAt: { gte: startOfMonth },
        },
      }),
      prisma.order.count({
        where: {
          createdAt: {
            gte: startOfLastMonth,
            lte: endOfLastMonth,
          },
        },
      }),
      prisma.order.count({
        where: { status: 'PENDING' },
      }),
      prisma.product.count({
        where: {
          stock: { lte: prisma.product.fields.lowStockAlert },
          status: 'ACTIVE',
        },
      }),
    ]);

    // Get revenue
    const revenue = await prisma.order.aggregate({
      _sum: { total: true },
      where: {
        status: { notIn: ['CANCELLED', 'REFUNDED'] },
      },
    });

    const monthlyRevenue = await prisma.order.aggregate({
      _sum: { total: true },
      where: {
        createdAt: { gte: startOfMonth },
        status: { notIn: ['CANCELLED', 'REFUNDED'] },
      },
    });

    const lastMonthRevenue = await prisma.order.aggregate({
      _sum: { total: true },
      where: {
        createdAt: {
          gte: startOfLastMonth,
          lte: endOfLastMonth,
        },
        status: { notIn: ['CANCELLED', 'REFUNDED'] },
      },
    });

    // Calculate growth percentages
    const ordersGrowth = lastMonthOrders
      ? ((monthlyOrders - lastMonthOrders) / lastMonthOrders) * 100
      : 0;

    const revenueGrowth =
      lastMonthRevenue._sum.total && monthlyRevenue._sum.total
        ? ((monthlyRevenue._sum.total - lastMonthRevenue._sum.total) /
            lastMonthRevenue._sum.total) *
          100
        : 0;

    res.json({
      success: true,
      data: {
        overview: {
          totalRevenue: revenue._sum.total || 0,
          totalOrders,
          totalUsers,
          totalProducts,
        },
        monthly: {
          revenue: monthlyRevenue._sum.total || 0,
          orders: monthlyOrders,
          revenueGrowth: revenueGrowth.toFixed(2),
          ordersGrowth: ordersGrowth.toFixed(2),
        },
        alerts: {
          pendingOrders,
          lowStockProducts,
        },
      },
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics',
      error: error.message,
    });
  }
};

/**
 * @desc    Get sales chart data
 * @route   GET /api/admin/sales-chart
 * @access  Private/Admin
 */
exports.getSalesChart = async (req, res) => {
  try {
    const { period = 'week' } = req.query;
    const now = new Date();
    let startDate;

    switch (period) {
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'year':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startDate = new Date(now.setDate(now.getDate() - 7));
    }

    const orders = await prisma.order.groupBy({
      by: ['createdAt'],
      _sum: { total: true },
      _count: true,
      where: {
        createdAt: { gte: startDate },
        status: { notIn: ['CANCELLED', 'REFUNDED'] },
      },
      orderBy: { createdAt: 'asc' },
    });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error('Sales chart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching sales chart data',
      error: error.message,
    });
  }
};

/**
 * @desc    Get recent orders
 * @route   GET /api/admin/recent-orders
 * @access  Private/Admin
 */
exports.getRecentOrders = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const orders = await prisma.order.findMany({
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        items: {
          include: { product: true },
        },
      },
    });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error('Recent orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent orders',
      error: error.message,
    });
  }
};

/**
 * @desc    Get all users
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, role, status, search } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (role) where.role = role;
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { email: { contains: search } },
        { firstName: { contains: search } },
        { lastName: { contains: search } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: parseInt(limit),
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          role: true,
          status: true,
          emailVerified: true,
          createdAt: true,
          _count: {
            select: { orders: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalItems: total,
        },
      },
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message,
    });
  }
};

/**
 * @desc    Update user status
 * @route   PUT /api/admin/users/:id/status
 * @access  Private/Admin
 */
exports.updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        status: true,
      },
    });

    res.json({
      success: true,
      message: 'User status updated successfully',
      data: user,
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user status',
      error: error.message,
    });
  }
};

/**
 * @desc    Get all orders
 * @route   GET /api/admin/orders
 * @access  Private/Admin
 */
exports.getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, paymentStatus, search } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (status) where.status = status;
    if (paymentStatus) where.paymentStatus = paymentStatus;
    if (search) {
      where.OR = [
        { orderNumber: { contains: search } },
        { user: { email: { contains: search } } },
      ];
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: parseInt(limit),
        include: {
          user: {
            select: { id: true, firstName: true, lastName: true, email: true },
          },
          items: {
            include: { product: true },
          },
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
 * @desc    Update order status
 * @route   PUT /api/admin/orders/:id/status
 * @access  Private/Admin
 */
/**
 * @desc    Get single order detail (admin)
 * @route   GET /api/admin/orders/:id
 * @access  Admin
 */
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } },
        shippingAddress: true,
        payment: true,
        items: {
          include: {
            product: { include: { images: { where: { isPrimary: true } } } },
            variant: true,
          },
        },
        statusHistory: { orderBy: { createdAt: 'asc' } },
      },
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    console.error('Get order by id error:', error);
    res.status(500).json({ success: false, message: 'Error fetching order', error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes, trackingNumber } = req.body;

    const updateData = { status };
    if (trackingNumber) updateData.trackingNumber = trackingNumber;
    if (status === 'DELIVERED') updateData.deliveredAt = new Date();

    // Update order
    const order = await prisma.order.update({
      where: { id },
      data: updateData,
    });

    // Add status history
    await prisma.orderStatusHistory.create({
      data: {
        orderId: id,
        status,
        notes,
      },
    });

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: order,
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
      error: error.message,
    });
  }
};

/**
 * @desc    Get low stock products
 * @route   GET /api/admin/low-stock
 * @access  Private/Admin
 */
exports.getLowStockProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        stock: { lte: prisma.product.fields.lowStockAlert },
        status: 'ACTIVE',
      },
      include: {
        category: true,
        variants: true,
      },
      orderBy: { stock: 'asc' },
    });

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Low stock products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching low stock products',
      error: error.message,
    });
  }
};

/**
 * @desc    Get all products (admin view)
 * @route   GET /api/admin/products
 * @access  Private/Admin
 */
exports.getAdminProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        sku: true,
        basePrice: true,
        discountPrice: true,
        stock: true,
        status: true,
        isFeatured: true,
        createdAt: true,
        images: {
          select: { url: true, isPrimary: true },
          orderBy: { sortOrder: 'asc' },
          take: 1,
        },
        categories: {
          select: { category: { select: { name: true } } },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error('Error fetching admin products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message,
    });
  }
};

/**
 * @desc    Import products from CSV
 * @route   POST /api/admin/products/import
 * @access  Private/Admin
 */
exports.importProductsFromCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const csvText = req.file.buffer.toString('utf-8');
    const rows = parseCSV(csvText);

    if (rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'CSV file is empty',
      });
    }

    let importedCount = 0;
    const errors = [];

    // Get or create default category
    let defaultCategory = await prisma.category.findFirst();
    if (!defaultCategory) {
      defaultCategory = await prisma.category.create({
        data: {
          name: 'General',
          slug: 'general',
          description: 'General products',
        },
      });
    }

    // Process each row
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      try {
        const name = row['Name'] || row['name'] || '';
        const sku = row['SKU'] || row['sku'] || `SKU-${Date.now()}-${i}`;

        if (!name || !sku) {
          errors.push(`Row ${i + 2}: Missing name or SKU`);
          continue;
        }

        // Check if product already exists
        const existingProduct = await prisma.product.findUnique({
          where: { sku },
        });

        if (existingProduct) {
          continue;
        }

        const basePrice = parsePrice(
          row['Regular price'] || row['basePrice'] || '0'
        );
        const discountPrice = parsePrice(
          row['Sale price'] || row['discountPrice'] || ''
        );
        const stock = parseStock(row['Stock'] || row['stock'] || '0');
        const slug = await generateUniqueSlug(name);

        await prisma.product.create({
          data: {
            name,
            slug,
            sku,
            description: row['Description'] || row['description'] || '',
            shortDescription:
              row['Short description'] || row['shortDescription'] || '',
            basePrice: basePrice || 0,
            discountPrice: discountPrice || null,
            stock: stock,
            lowStockAlert: 10,
            brand: row['Brands'] || row['brand'] || null,
            material: row['Attribute 1 value(s)'] || row['material'] || null,
            warranty: row['warranty'] || null,
            status:
              row['Published'] === '1' || row['Published'] === 'true'
                ? 'ACTIVE'
                : 'INACTIVE',
            isFeatured:
              row['Is featured?'] === '1' || row['Is featured?'] === 'true',
            categoryId: defaultCategory.id,
          },
        });

        importedCount++;
      } catch (rowError) {
        errors.push(`Row ${i + 2}: ${rowError.message}`);
      }
    }

    res.status(200).json({
      success: true,
      importedCount,
      totalRows: rows.length,
      errors: errors.slice(0, 10),
    });
  } catch (error) {
    console.error('Error importing CSV:', error);
    res.status(500).json({
      success: false,
      message: 'Error importing CSV',
      error: error.message,
    });
  }
};

/**
 * @desc    Create product
 * @route   POST /api/admin/products
 * @access  Private/Admin
 */
exports.createAdminProduct = async (req, res) => {
  try {
    const {
      name, sku, shortDescription, description,
      basePrice, discountPrice, stock, lowStockAlert,
      brand, material, warranty, status, isFeatured,
      offers = [],
      categoryIds = [],
      images = [], specifications = [], variants = [], freebies = [],
    } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Product name is required' });
    }

    const slug = await generateUniqueSlug(name);

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        sku: sku || null,
        shortDescription: shortDescription || null,
        description: description || null,
        basePrice: basePrice ? parseFloat(basePrice) : null,
        discountPrice: discountPrice ? parseFloat(discountPrice) : null,
        stock: parseInt(stock) || 0,
        lowStockAlert: parseInt(lowStockAlert) || 10,
        brand: brand || null,
        material: material || null,
        warranty: warranty || null,
        status: status || 'ACTIVE',
        isFeatured: Boolean(isFeatured),
        offers: Array.isArray(offers) && offers.length ? offers : null,
        // Relations
        categories: categoryIds.length ? {
          create: categoryIds.map(cid => ({ categoryId: cid })),
        } : undefined,
        images: images.length ? {
          create: images.map((img, i) => ({
            url: img.url,
            altText: img.altText || null,
            isPrimary: img.isPrimary || i === 0,
            sortOrder: i,
          })),
        } : undefined,
        specifications: specifications.length ? {
          create: specifications.map((s, i) => ({ label: s.label, value: s.value, sortOrder: i })),
        } : undefined,
        variants: variants.length ? {
          create: variants.map((v, i) => ({
            sizeGroup: v.sizeGroup || null,
            size: v.size,
            thickness: v.thickness || null,
            firmness: v.firmness || null,
            price: parseFloat(v.price),
            salePrice: v.salePrice ? parseFloat(v.salePrice) : null,
            sortOrder: i,
          })),
        } : undefined,
        freebies: freebies.length ? {
          create: freebies.map((f, i) => ({ name: f.name, image: f.image || null, sortOrder: i })),
        } : undefined,
      },
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, message: 'Error creating product', error: error.message });
  }
};

/**
 * @desc    Get single product (admin view)
 * @route   GET /api/admin/products/:id
 * @access  Private/Admin
 */
exports.getAdminProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        categories: { include: { category: { select: { id: true, name: true, slug: true } } } },
        images: { orderBy: { sortOrder: 'asc' } },
        variants: { orderBy: { sortOrder: 'asc' } },
        specifications: { orderBy: { sortOrder: 'asc' } },
        badges: { orderBy: { sortOrder: 'asc' } },
        freebies: { orderBy: { sortOrder: 'asc' } },
      },
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Get admin product error:', error);
    res.status(500).json({ success: false, message: 'Error fetching product', error: error.message });
  }
};

/**
 * @desc    Update product (admin)
 * @route   PUT /api/admin/products/:id
 * @access  Private/Admin
 */
exports.updateAdminProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, shortDescription, description,
      basePrice, discountPrice,
      stock, lowStockAlert,
      brand, material, warranty,
      status, isFeatured,
      offers,
      categoryIds,
      images, specifications, variants, freebies,
    } = req.body;

    // Update scalar fields
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (shortDescription !== undefined) updateData.shortDescription = shortDescription || null;
    if (description !== undefined) updateData.description = description || null;
    if (basePrice !== undefined) updateData.basePrice = basePrice ? parseFloat(basePrice) : null;
    if (discountPrice !== undefined) updateData.discountPrice = discountPrice ? parseFloat(discountPrice) : null;
    if (stock !== undefined) updateData.stock = parseInt(stock) || 0;
    if (lowStockAlert !== undefined) updateData.lowStockAlert = parseInt(lowStockAlert) || 10;
    if (brand !== undefined) updateData.brand = brand || null;
    if (material !== undefined) updateData.material = material || null;
    if (warranty !== undefined) updateData.warranty = warranty || null;
    if (status !== undefined) updateData.status = status;
    if (isFeatured !== undefined) updateData.isFeatured = Boolean(isFeatured);
    if (offers !== undefined) updateData.offers = Array.isArray(offers) && offers.length ? offers : null;

    await prisma.product.update({ where: { id }, data: updateData });

    // Replace categories
    if (categoryIds !== undefined) {
      await prisma.productCategory.deleteMany({ where: { productId: id } });
      if (categoryIds.length) {
        await prisma.productCategory.createMany({
          data: categoryIds.map(cid => ({ productId: id, categoryId: cid })),
          skipDuplicates: true,
        });
      }
    }

    // Replace images
    if (images !== undefined) {
      await prisma.productImage.deleteMany({ where: { productId: id } });
      if (images.length) {
        await prisma.productImage.createMany({
          data: images.map((img, i) => ({
            productId: id,
            url: img.url,
            altText: img.altText || null,
            isPrimary: img.isPrimary || i === 0,
            sortOrder: i,
          })),
        });
      }
    }

    // Replace specifications
    if (specifications !== undefined) {
      await prisma.productSpecification.deleteMany({ where: { productId: id } });
      if (specifications.length) {
        await prisma.productSpecification.createMany({
          data: specifications.map((s, i) => ({ productId: id, label: s.label, value: s.value, sortOrder: i })),
        });
      }
    }

    // Replace freebies
    if (freebies !== undefined) {
      await prisma.productFreebie.deleteMany({ where: { productId: id } });
      if (freebies.length) {
        await prisma.productFreebie.createMany({
          data: freebies.map((f, i) => ({ productId: id, name: f.name, image: f.image || null, sortOrder: i })),
        });
      }
    }

    // Replace variants (keep existing by id, add new)
    if (variants !== undefined) {
      const existingIds = variants.filter(v => v.id).map(v => v.id);
      // Delete variants not in the new list
      await prisma.productVariant.deleteMany({
        where: { productId: id, id: { notIn: existingIds } },
      });
      for (let i = 0; i < variants.length; i++) {
        const v = variants[i];
        const vdata = {
          sizeGroup: v.sizeGroup || null,
          size: v.size,
          thickness: v.thickness || null,
          firmness: v.firmness || null,
          price: parseFloat(v.price),
          salePrice: v.salePrice ? parseFloat(v.salePrice) : null,
          sortOrder: i,
        };
        if (v.id) {
          await prisma.productVariant.update({ where: { id: v.id }, data: vdata });
        } else {
          await prisma.productVariant.create({ data: { ...vdata, productId: id } });
        }
      }
    }

    res.json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    console.error('Update admin product error:', error);
    res.status(500).json({ success: false, message: 'Error updating product', error: error.message });
  }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/admin/products/:id
 * @access  Private/Admin
 */
exports.deleteAdminProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete relations that may not have onDelete: Cascade
    await prisma.orderItem.deleteMany({ where: { productId: id } });
    await prisma.cartItem.deleteMany({ where: { productId: id } });
    await prisma.wishlistItem.deleteMany({ where: { productId: id } });
    await prisma.review.deleteMany({ where: { productId: id } });
    await prisma.relatedProduct.deleteMany({
      where: { OR: [{ productId: id }, { relatedProductId: id }] },
    });

    // Cascade-covered relations (just to be safe)
    await prisma.productImage.deleteMany({ where: { productId: id } });
    await prisma.productVariant.deleteMany({ where: { productId: id } });
    await prisma.productSpecification.deleteMany({ where: { productId: id } });
    await prisma.productFreebie.deleteMany({ where: { productId: id } });
    await prisma.productBadge.deleteMany({ where: { productId: id } });
    await prisma.productCategory.deleteMany({ where: { productId: id } });

    await prisma.product.delete({ where: { id } });

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Error deleting product', error: error.message });
  }
};

// ==================== HELPER FUNCTIONS ====================

function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  const headers = lines[0]
    .split(',')
    .map((h) => h.trim().replace(/^"(.*)"$/, '$1'));

  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    const regex = /("([^"]*)")|([^,]+)/g;
    const fields = [];
    let match;
    while ((match = regex.exec(line)) !== null) {
      if (match[2]) {
        fields.push(match[2]);
      } else {
        fields.push(match[3]?.trim() || '');
      }
    }

    const row = {};
    headers.forEach((header, index) => {
      row[header] = fields[index] || '';
    });
    data.push(row);
  }

  return data;
}

async function generateUniqueSlug(baseName) {
  let slug = baseName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
  let count = 1;

  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${baseName.toLowerCase().replace(/\s+/g, '-')}-${count}`;
    count++;
  }

  return slug;
}

function parsePrice(value) {
  if (!value || value.trim() === '') return null;
  const num = parseFloat(value.replace(/[^\d.-]/g, ''));
  return isNaN(num) ? null : num;
}

function parseStock(value) {
  if (!value || value.trim() === '') return 0;
  const num = parseInt(value);
  return isNaN(num) ? 0 : num;
}

// ─── SEO: Global ─────────────────────────────────────────────────────────────

const SEO_GLOBAL_KEYS = [
  'siteTitle', 'siteDescription', 'siteKeywords',
  'ogTitle', 'ogDescription', 'ogImage',
  'googleAnalyticsId', 'robotsTxt',
];

exports.getGlobalSeo = async (req, res) => {
  try {
    const rows = await prisma.setting.findMany({
      where: { key: { in: SEO_GLOBAL_KEYS.map(k => `seo_${k}`) } },
    });
    const result = {};
    rows.forEach(r => { result[r.key.replace('seo_', '')] = r.value; });
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateGlobalSeo = async (req, res) => {
  try {
    const allowed = SEO_GLOBAL_KEYS.filter(k => req.body[k] !== undefined);
    await Promise.all(
      allowed.map(k =>
        prisma.setting.upsert({
          where: { key: `seo_${k}` },
          update: { value: String(req.body[k]) },
          create: { key: `seo_${k}`, value: String(req.body[k]), type: 'string' },
        })
      )
    );
    res.json({ success: true, message: 'Global SEO saved' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── SEO: Pages ───────────────────────────────────────────────────────────────

exports.getPagesSeo = async (req, res) => {
  try {
    const rows = await prisma.setting.findMany({
      where: { key: { startsWith: 'page_seo_' } },
    });
    const result = {};
    rows.forEach(r => {
      const route = r.key.replace('page_seo_', '');
      try { result[route] = JSON.parse(r.value); } catch { result[route] = {}; }
    });
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updatePageSeo = async (req, res) => {
  try {
    const { route } = req.params;
    const { metaTitle = '', metaDescription = '', focusKeywords = '', canonicalUrl = '' } = req.body;
    await prisma.setting.upsert({
      where: { key: `page_seo_${route}` },
      update: { value: JSON.stringify({ metaTitle, metaDescription, focusKeywords, canonicalUrl }) },
      create: { key: `page_seo_${route}`, value: JSON.stringify({ metaTitle, metaDescription, focusKeywords, canonicalUrl }), type: 'json' },
    });
    res.json({ success: true, message: 'Page SEO saved' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── SEO: Product ─────────────────────────────────────────────────────────────

exports.updateProductSeo = async (req, res) => {
  try {
    const { id } = req.params;
    const { metaTitle, metaDescription, focusKeywords } = req.body;
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(metaTitle !== undefined && { metaTitle }),
        ...(metaDescription !== undefined && { metaDescription }),
        ...(focusKeywords !== undefined && { metaKeywords: focusKeywords }),
      },
      select: { id: true, name: true, metaTitle: true, metaDescription: true, metaKeywords: true },
    });
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = exports;
