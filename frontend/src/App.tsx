import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { RouteScrollTop } from './components/ui/RouteScrollTop';
import AdminLayout from './components/admin/AdminLayout';

// Shop pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import AccountPage from './pages/AccountPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ReturnPage from './pages/ReturnPage';
import ShippingPage from './pages/ShippingPage';
import WarrantyPage from './pages/WarrantyPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

// Admin pages
import AdminLoginPage from './pages/AdminLoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import AdminProductsPage from './pages/admin/ProductsPage';
import AddProductPage from './pages/admin/AddProductPage';
import EditProductPage from './pages/admin/EditProductPage';
import CategoriesPage from './pages/admin/CategoriesPage';
import OrdersPage from './pages/admin/OrdersPage';
import OrderDetailPage from './pages/admin/OrderDetailPage';
import UsersPage from './pages/admin/UsersPage';
import UserDetailPage from './pages/admin/UserDetailPage';
import CouponsPage from './pages/admin/CouponsPage';
import SeoPage from './pages/admin/SeoPage';

function ShopLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <RouteScrollTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Shop routes */}
        <Route element={<ShopLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/return" element={<ReturnPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/warranty" element={<WarrantyPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/* Admin login — standalone, no layout */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

        {/* Admin routes — protected by AdminLayout */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/products/add" element={<AddProductPage />} />
          <Route path="/admin/products/:id" element={<EditProductPage />} />
          <Route path="/admin/categories" element={<CategoriesPage />} />
          <Route path="/admin/orders" element={<OrdersPage />} />
          <Route path="/admin/orders/:id" element={<OrderDetailPage />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/users/:id" element={<UserDetailPage />} />
          <Route path="/admin/coupons" element={<CouponsPage />} />
          <Route path="/admin/seo" element={<SeoPage />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
