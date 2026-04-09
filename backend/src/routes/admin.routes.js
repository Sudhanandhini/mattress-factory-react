const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect, adminOnly } = require('../middleware/auth.middleware');
const adminController = require('../controllers/admin.controller');

// Multer for CSV import
const csvUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv') cb(null, true);
    else cb(new Error('Only CSV files are allowed'), false);
  },
});

// Multer for image uploads — disk storage
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});
const imageUpload = multer({
  storage: imageStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'), false);
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
router.get('/orders/:id', adminController.getOrderById);
router.put('/orders/:id/status', adminController.updateOrderStatus);

// Product Management
router.get('/products', adminController.getAdminProducts);
router.post('/products', adminController.createAdminProduct);
router.post('/products/import', csvUpload.single('file'), adminController.importProductsFromCSV);

// Image upload
router.post('/upload', imageUpload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, error: 'No file uploaded' });
  // Store as absolute URL so it works in all environments
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const url = `${baseUrl}/uploads/${req.file.filename}`;
  res.json({ success: true, url });
});
router.get('/products/:id', adminController.getAdminProductById);
router.put('/products/:id', adminController.updateAdminProduct);
router.delete('/products/:id', adminController.deleteAdminProduct);
router.put('/products/:id/seo', adminController.updateProductSeo);

// SEO Settings
router.get('/seo', adminController.getGlobalSeo);
router.put('/seo', adminController.updateGlobalSeo);
router.get('/seo/pages', adminController.getPagesSeo);
router.put('/seo/pages/:route', adminController.updatePageSeo);

module.exports = router;
