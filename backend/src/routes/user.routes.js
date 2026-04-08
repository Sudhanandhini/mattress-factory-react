const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/users/addresses
router.get('/addresses', protect, async (req, res) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { userId: req.user.id },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }],
    });
    res.json({ success: true, data: addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/users/addresses
router.post('/addresses', protect, async (req, res) => {
  try {
    const { fullName, phone, addressLine1, addressLine2, city, state, pincode, landmark, type, isDefault } = req.body;
    if (isDefault) {
      await prisma.address.updateMany({ where: { userId: req.user.id }, data: { isDefault: false } });
    }
    const address = await prisma.address.create({
      data: { userId: req.user.id, fullName, phone, addressLine1, addressLine2, city, state, pincode, landmark, type: type || 'HOME', isDefault: !!isDefault },
    });
    res.status(201).json({ success: true, data: address });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/users/addresses/:id
router.put('/addresses/:id', protect, async (req, res) => {
  try {
    const { fullName, phone, addressLine1, addressLine2, city, state, pincode, landmark, type, isDefault } = req.body;
    const existing = await prisma.address.findFirst({ where: { id: req.params.id, userId: req.user.id } });
    if (!existing) return res.status(404).json({ success: false, message: 'Address not found' });
    if (isDefault) {
      await prisma.address.updateMany({ where: { userId: req.user.id }, data: { isDefault: false } });
    }
    const updated = await prisma.address.update({
      where: { id: req.params.id },
      data: { fullName, phone, addressLine1, addressLine2, city, state, pincode, landmark, type, isDefault: !!isDefault },
    });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/users/addresses/:id
router.delete('/addresses/:id', protect, async (req, res) => {
  try {
    const existing = await prisma.address.findFirst({ where: { id: req.params.id, userId: req.user.id } });
    if (!existing) return res.status(404).json({ success: false, message: 'Address not found' });
    await prisma.address.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
