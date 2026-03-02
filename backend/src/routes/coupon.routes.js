const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth.middleware');

// Coupon routes will be implemented here
// POST /api/coupons/validate (protected)
// GET /api/coupons (admin)
// POST /api/coupons (admin)

module.exports = router;
