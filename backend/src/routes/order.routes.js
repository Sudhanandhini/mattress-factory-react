const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const orderController = require('../controllers/order.controller');

// All order routes require authentication
router.use(protect);

router.get('/', orderController.getUserOrders);
router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrder);
router.put('/:id/cancel', orderController.cancelOrder);
router.get('/:id/track', orderController.trackOrder);

module.exports = router;
