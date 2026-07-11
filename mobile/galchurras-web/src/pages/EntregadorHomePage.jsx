import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Entregas de exemplo (mock — substituir por chamada à API futuramente).
const INITIAL_DELIVERIES = [
  {
    id: 101,
    shop: 'Boi Nobre',
    customer: 'Ana Beatriz',
    address: 'R. das Palmeiras, 240 — Centro',
    distance: '2,4 km',
    payout: 12.5,
    items: 2,
    status: 'DISPONIVEL',
  },
  {
    id: 102,
    shop: 'Casa do Corte',
    customer: 'Marcos Silva',
    address: 'Av. Brasil, 1180 — Jd. América',
    distance: '3,1 km',
    payout: 15.0,
    items: 1,
    status: 'DISPONIVEL',
  },
  {
    id: 103,
    shop: 'Estância Prime',
    customer: 'Rafael Gomes',
    address: 'R. Sete de Setembro, 55 — Vila Nova',
    distance: '1,2 km',
    payout: 9.0,
    items: 3,
    status: 'EM_ROTA',
  },
];

const STATUS_LABEL = {
  DISPONIVEL: 'Disponível',
  EM_ROTA: 'Em rota',
  ENTREGUE: 'Entregue',
};

export default function EntregadorHomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [deliveries, setDeliveries] = useState(INITIAL_DELIVERIES);
  const [online, setOnline] = useState(true);

  const advance = (id, next) =>
    setDeliveries((prev) => prev.map((d) => (d.id === id ? { ...d, status: next } : d)));

  const active = deliveries.filter((d) => d.status !== 'ENTREGUE');
  const doneToday = deliveries.filter((d) => d.status === 'ENTREGUE').length;
  const earnings = deliveries
    .filter((d) => d.status === 'ENTREGUE')
    .reduce((acc, d) => acc + d.payout, 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const firstName = (user?.nome || 'Entregador').split(' ')[0];
  const initial = firstName.charAt(0).toUpperCase();

  return (
    <div className="screen role-screen">
      <header className="role-header">
        <div className="role-header-user">
          <div className="role-avatar">{initial}</div>
          <div>
            <span className="role-greeting">Olá, entregador</span>
            <strong className="role-name">{firstName}</strong>
          </div>
        </div>
        <button className="role-logout" onClick={handleLogout} title="Sair">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </header>

      <button
        className={`role-toggle-online${online ? ' on' : ''}`}
        onClick={() => setOnline((v) => !v)}
      >
        <span className="role-toggle-dot" />
        {online ? 'Você está online — recebendo entregas' : 'Você está offline'}
      </button>

      <div className="role-stats">
        <div className="role-stat-card">
          <span className="role-stat-value">{active.length}</span>
          <span className="role-stat-label">Ativas</span>
        </div>
        <div className="role-stat-card">
          <span className="role-stat-value">{doneToday}</span>
          <span className="role-stat-label">Entregues hoje</span>
        </div>
        <div className="role-stat-card">
          <span className="role-stat-value gold">R$ {earnings.toFixed(2).replace('.', ',')}</span>
          <span className="role-stat-label">Ganhos hoje</span>
        </div>
      </div>

      <div className="role-section">
        <h2 className="section-title">Entregas</h2>

        {active.length === 0 && (
          <div className="role-empty">
            <span>Nenhuma entrega no momento.</span>
            <span className="role-empty-sub">Fique online para receber novos pedidos.</span>
          </div>
        )}

        <div className="role-list">
          {active.map((d) => (
            <div key={d.id} className="role-card">
              <div className="role-card-top">
                <div>
                  <span className="role-card-tag">PEDIDO #{d.id}</span>
                  <strong className="role-card-title">{d.shop}</strong>
                </div>
                <span className={`role-badge status-${d.status.toLowerCase()}`}>
                  {STATUS_LABEL[d.status]}
                </span>
              </div>

              <div className="role-card-line">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {d.customer}
              </div>
              <div className="role-card-line">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {d.address}
              </div>

              <div className="role-card-meta">
                <span className="role-chip">{d.distance}</span>
                <span className="role-chip">{d.items} {d.items > 1 ? 'itens' : 'item'}</span>
                <span className="role-chip gold">R$ {d.payout.toFixed(2).replace('.', ',')}</span>
              </div>

              {d.status === 'DISPONIVEL' && (
                <button className="btn-primary" onClick={() => advance(d.id, 'EM_ROTA')}>
                  Aceitar entrega
                </button>
              )}
              {d.status === 'EM_ROTA' && (
                <button className="btn-primary" onClick={() => advance(d.id, 'ENTREGUE')}>
                  Confirmar entrega
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
