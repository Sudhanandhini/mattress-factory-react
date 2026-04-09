const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth.middleware');
const {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  getAllReviews,
  approveReview,
} = require('../controllers/review.controller');

// Public
router.get('/product/:productId', getProductReviews);

// Admin
router.get('/admin', protect, adminOnly, getAllReviews);
router.patch('/:id/approve', protect, adminOnly, approveReview);

// User (protected)
router.post('/', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
