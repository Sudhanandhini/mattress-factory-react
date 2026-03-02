const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth.middleware');

// Review routes will be implemented here
// GET /api/reviews/product/:productId
// POST /api/reviews (protected)
// PUT /api/reviews/:id (protected)
// DELETE /api/reviews/:id (protected)

module.exports = router;
