import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoutes from './components/RoleRoutes';
import CartBar from './components/CartBar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RegisterClientePage from './pages/RegisterClientePage';
import RegisterEntregadorPage from './pages/RegisterEntregadorPage';
import RegisterEstabelecimentoPage from './pages/RegisterEstabelecimentoPage';
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
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/register/cliente" element={<RegisterClientePage />} />
              <Route path="/register/entregador" element={<RegisterEntregadorPage />} />
              <Route path="/register/estabelecimento" element={<RegisterEstabelecimentoPage />} />
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
