const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect, adminOnly } = require('../middleware/auth.middleware');
const adminController = require('../controllers/admin.controller');

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv') {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'), false);
    }
  },
});

// All admin routes require authentication and admin role
router.use(protect, adminOnly);

// Dashboard & Analytics
router.get('/dashboard', adminController.getDashboardStats);
router.get('/sales-chart', adminController.getSalesChart);
router.get('/recent-orders', adminController.getRecentOrders);
router.get('/low-stock', adminController.getLowStockProducts);

// User Management
router.get('/users', adminController.getAllUsers);
router.put('/users/:id/status', adminController.updateUserStatus);

// Order Management
router.get('/orders', adminController.getAllOrders);
router.put('/orders/:id/status', adminController.updateOrderStatus);

// Product Management
router.get('/products', adminController.getAdminProducts);
router.post('/products', adminController.createAdminProduct);
router.post('/products/import', upload.single('file'), adminController.importProductsFromCSV);
router.get('/products/:id', adminController.getAdminProductById);
router.put('/products/:id', adminController.updateAdminProduct);
router.delete('/products/:id', adminController.deleteAdminProduct);

module.exports = router;
