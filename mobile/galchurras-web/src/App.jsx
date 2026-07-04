import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import CartBar from './components/CartBar';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HomePage from './pages/HomePage';
import KitDetailPage from './pages/KitDetailPage';
import ButcherShopPage from './pages/ButcherShopPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import AccountPage from './pages/AccountPage';
import AddressesPage from './pages/AddressesPage';
import KitsPage from './pages/KitsPage';
import ShopsPage from './pages/ShopsPage';
import EditProfilePage from './pages/EditProfilePage';
import FavoritesPage from './pages/FavoritesPage';
import './App.css';

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <CartProvider>
          <div className="app-shell">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/kit/:id" element={<KitDetailPage />} />
                      <Route path="/butcher/:id" element={<ButcherShopPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/orders" element={<OrdersPage />} />
                      <Route path="/account" element={<AccountPage />} />
                      <Route path="/addresses" element={<AddressesPage />} />
                      <Route path="/kits" element={<KitsPage />} />
                      <Route path="/shops" element={<ShopsPage />} />
                      <Route path="/account/edit" element={<EditProfilePage />} />
                      <Route path="/favorites" element={<FavoritesPage />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />
            </Routes>
            <CartBar />
          </div>
        </CartProvider>
      </AuthProvider>
    </HashRouter>
  );
}
