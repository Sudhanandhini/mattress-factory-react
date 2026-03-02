const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth.middleware');
const categoryController = require('../controllers/category.controller');

// Public routes
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategory);
router.get('/slug/:slug', categoryController.getCategoryBySlug);
router.get('/:id/products', categoryController.getCategoryProducts);

// Admin routes
router.post('/', protect, adminOnly, categoryController.createCategory);
router.put('/:id', protect, adminOnly, categoryController.updateCategory);
router.delete('/:id', protect, adminOnly, categoryController.deleteCategory);

module.exports = router;
