import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoutes from './components/RoleRoutes';
import CartBar from './components/CartBar';
import LoginPage from './pages/LoginPage';
import RegisterClientePage from './pages/RegisterClientePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import './App.css';

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <CartProvider>
          <div className="app-shell">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register/cliente" element={<RegisterClientePage />} />
              {/* Neste app (cliente) só se cria conta de cliente */}
              <Route path="/register" element={<Navigate to="/register/cliente" replace />} />
              <Route path="/register/*" element={<Navigate to="/register/cliente" replace />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <RoleRoutes />
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
