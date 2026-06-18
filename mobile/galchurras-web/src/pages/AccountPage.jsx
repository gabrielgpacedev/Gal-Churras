import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { useAuth } from '../context/AuthContext';
import { currentUser } from '../data/mockData';

const menuItems = [
  {
    id: 'orders',
    label: 'Meus pedidos',
    sub: 'Histórico e status',
    path: '/orders',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    id: 'favorites',
    label: 'Favoritos',
    sub: 'Kits e açougues salvos',
    path: '/favorites',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    id: 'addresses',
    label: 'Endereços',
    sub: 'Casa, trabalho...',
    path: '/addresses',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: 'notifications',
    label: 'Notificações',
    sub: 'Status do pedido',
    path: null,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
  },
];

export default function AccountPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="screen">
      <div className="account-header">
        <h1 className="account-title">Conta</h1>
      </div>

      <div className="account-content">
        <div className="account-user-card">
          <div className="account-avatar">{currentUser.avatar}</div>
          <div className="account-user-info">
            <span className="account-user-name">{currentUser.name}</span>
            <span className="account-user-email">{currentUser.email}</span>
          </div>
          <button className="account-edit-btn" onClick={() => navigate('/account/edit')}>Editar</button>
        </div>

        <div className="account-menu">
          {menuItems.map((item, idx) => (
            <button
              key={item.id}
              className={`account-menu-item${idx < menuItems.length - 1 ? ' border-bottom' : ''}`}
              onClick={() => item.path && navigate(item.path)}
            >
              <div className="account-menu-icon">{item.icon}</div>
              <div className="account-menu-text">
                <span className="account-menu-label">{item.label}</span>
                <span className="account-menu-sub">{item.sub}</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>

        <button className="account-logout-btn" onClick={handleLogout}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sair
        </button>

        <p className="account-version">BRASA · V0.1</p>
      </div>

      <BottomNav />
    </div>
  );
}
