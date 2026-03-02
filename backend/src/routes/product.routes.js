const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth.middleware');
const productController = require('../controllers/product.controller');

// Public routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.get('/slug/:slug', productController.getProductBySlug);

// Admin routes
router.post('/', protect, adminOnly, productController.createProduct);
router.put('/:id', protect, adminOnly, productController.updateProduct);
router.delete('/:id', protect, adminOnly, productController.deleteProduct);

// Product images
router.post('/:id/images', protect, adminOnly, productController.addProductImages);
router.delete('/:id/images/:imageId', protect, adminOnly, productController.deleteProductImage);

module.exports = router;
