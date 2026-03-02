const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { validateSignup, validateLogin, validateForgotPassword, validateResetPassword, validateChangePassword } = require('../validators/auth.validator');

// Public routes
router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateLogin, authController.login);
router.post('/forgot-password', validateForgotPassword, authController.forgotPassword);
router.post('/reset-password', validateResetPassword, authController.resetPassword);
router.post('/refresh-token', authController.refreshToken);

// Protected routes
router.get('/me', protect, authController.getMe);
router.post('/logout', protect, authController.logout);
router.post('/change-password', protect, validateChangePassword, authController.changePassword);

module.exports = router;
