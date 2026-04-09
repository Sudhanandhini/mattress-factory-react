const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const paymentController = require('../controllers/payment.controller');

// All payment routes require authentication
router.use(protect);

router.post('/initiate',          paymentController.initiateRazorpay);
router.post('/verify-signature',  paymentController.verifySignature);
router.post('/create-order',      paymentController.createRazorpayOrder);
router.post('/verify',            paymentController.verifyPayment);
router.post('/cod',               paymentController.createCODOrder);
router.get('/:orderId',           paymentController.getPaymentDetails);

module.exports = router;
