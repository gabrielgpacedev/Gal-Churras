import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, ROLES } from '../context/AuthContext';

// Cliente
import HomePage from '../pages/HomePage';
import KitDetailPage from '../pages/KitDetailPage';
import ButcherShopPage from '../pages/ButcherShopPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrdersPage from '../pages/OrdersPage';
import AccountPage from '../pages/AccountPage';
import AddressesPage from '../pages/AddressesPage';
import KitsPage from '../pages/KitsPage';
import ShopsPage from '../pages/ShopsPage';
import EditProfilePage from '../pages/EditProfilePage';
import FavoritesPage from '../pages/FavoritesPage';
import CatalogoPage from '../pages/CatalogoPage';

// Perfis operacionais
import EntregadorHomePage from '../pages/EntregadorHomePage';
import EstabelecimentoHomePage from '../pages/EstabelecimentoHomePage';

// Cada perfil enxerga apenas as rotas do seu app.
export default function RoleRoutes() {
  const { role } = useAuth();

  if (role === ROLES.ENTREGADOR) {
    return (
      <Routes>
        <Route path="/entregador" element={<EntregadorHomePage />} />
        <Route path="*" element={<Navigate to="/entregador" replace />} />
      </Routes>
    );
  }

  if (role === ROLES.ESTABELECIMENTO) {
    return (
      <Routes>
        <Route path="/estabelecimento" element={<EstabelecimentoHomePage />} />
        <Route path="*" element={<Navigate to="/estabelecimento" replace />} />
      </Routes>
    );
  }

  // CLIENTE (padrão)
  return (
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
      <Route path="/catalogo" element={<CatalogoPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
