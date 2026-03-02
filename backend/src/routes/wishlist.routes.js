const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const wishlistController = require('../controllers/wishlist.controller');

// All wishlist routes require authentication
router.use(protect);

router.get('/', wishlistController.getWishlist);
router.post('/', wishlistController.addToWishlist);
router.delete('/:itemId', wishlistController.removeFromWishlist);
router.post('/:itemId/move-to-cart', wishlistController.moveToCart);
router.get('/check/:productId', wishlistController.checkWishlist);

module.exports = router;
