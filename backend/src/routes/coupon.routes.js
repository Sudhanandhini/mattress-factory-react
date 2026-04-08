const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { protect, adminOnly } = require('../middleware/auth.middleware');

const prisma = new PrismaClient();

// GET /api/coupons/active — public, returns active coupons for marquee ticker
router.get('/active', async (req, res) => {
  try {
    const now = new Date();
    const coupons = await prisma.coupon.findMany({
      where: {
        isActive: true,
        validFrom: { lte: now },
        validUntil: { gte: now },
      },
      select: {
        code: true,
        description: true,
        type: true,
        value: true,
        minOrderValue: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    res.json({ success: true, data: coupons });
  } catch (error) {
    console.error('Get active coupons error:', error);
    res.json({ success: true, data: [] }); // fail silently — marquee is non-critical
  }
});

// POST /api/coupons/validate — protected, validate a coupon code
router.post('/validate', protect, async (req, res) => {
  try {
    const { code, orderTotal } = req.body;
    const now = new Date();

    const coupon = await prisma.coupon.findFirst({
      where: {
        code: code.toUpperCase(),
        isActive: true,
        validFrom: { lte: now },
        validUntil: { gte: now },
      },
    });

    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Invalid or expired coupon code' });
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ success: false, message: 'Coupon usage limit reached' });
    }

    if (coupon.minOrderValue && parseFloat(orderTotal) < parseFloat(coupon.minOrderValue)) {
      return res.status(400).json({
        success: false,
        message: `Minimum order value of ₹${coupon.minOrderValue} required`,
      });
    }

    let discount = 0;
    if (coupon.type === 'PERCENTAGE') {
      discount = (parseFloat(orderTotal) * parseFloat(coupon.value)) / 100;
      if (coupon.maxDiscount) discount = Math.min(discount, parseFloat(coupon.maxDiscount));
    } else {
      discount = parseFloat(coupon.value);
    }

    res.json({ success: true, data: { coupon, discount: Math.round(discount) } });
  } catch (error) {
    console.error('Validate coupon error:', error);
    res.status(500).json({ success: false, message: 'Error validating coupon' });
  }
});

// GET /api/coupons — admin only
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ success: true, data: coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching coupons' });
  }
});

// POST /api/coupons — admin only
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { code, description, type, value, minOrderValue, maxDiscount, usageLimit, validFrom, validUntil } = req.body;
    const coupon = await prisma.coupon.create({
      data: {
        code: code.toUpperCase(),
        description,
        type,
        value: parseFloat(value),
        minOrderValue: minOrderValue ? parseFloat(minOrderValue) : null,
        maxDiscount: maxDiscount ? parseFloat(maxDiscount) : null,
        usageLimit: usageLimit ? parseInt(usageLimit) : null,
        validFrom: validFrom ? new Date(validFrom) : new Date(),
        validUntil: validUntil ? new Date(validUntil) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
    });
    res.status(201).json({ success: true, data: coupon });
  } catch (error) {
    console.error('Create coupon error:', error);
    res.status(500).json({ success: false, message: 'Error creating coupon', error: error.message });
  }
});

// DELETE /api/coupons/:id — admin only
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await prisma.coupon.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Coupon deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting coupon' });
  }
});

module.exports = router;
