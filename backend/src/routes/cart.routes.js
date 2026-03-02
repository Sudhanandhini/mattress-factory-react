const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const cartController = require('../controllers/cart.controller');

// All cart routes require authentication
router.use(protect);

router.get('/', cartController.getCart);
router.post('/', cartController.addToCart);
router.put('/:itemId', cartController.updateCartItem);
router.delete('/:itemId', cartController.removeFromCart);
router.delete('/', cartController.clearCart);
router.post('/coupon', cartController.applyCoupon);

module.exports = router;
