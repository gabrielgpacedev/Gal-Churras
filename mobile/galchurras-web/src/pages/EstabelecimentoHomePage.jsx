import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Pedidos recebidos de exemplo (mock — substituir por chamada à API futuramente).
const INITIAL_ORDERS = [
  {
    id: 5012,
    customer: 'Ana Beatriz',
    items: ['1x Kit Premium Costela', '2x Pão de alho'],
    total: 149.9,
    time: '19:42',
    status: 'NOVO',
  },
  {
    id: 5011,
    customer: 'Marcos Silva',
    items: ['1x Kit Picanha Nobre'],
    total: 189.0,
    time: '19:20',
    status: 'PREPARANDO',
  },
  {
    id: 5010,
    customer: 'Rafael Gomes',
    items: ['1x Kit Família', '1x Carvão 5kg'],
    total: 132.5,
    time: '18:55',
    status: 'PRONTO',
  },
];

const FLOW = {
  NOVO: { label: 'Novo', next: 'PREPARANDO', action: 'Aceitar pedido' },
  PREPARANDO: { label: 'Preparando', next: 'PRONTO', action: 'Marcar pronto' },
  PRONTO: { label: 'Pronto', next: 'ENVIADO', action: 'Despachar' },
  ENVIADO: { label: 'Enviado', next: null, action: null },
};

export default function EstabelecimentoHomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  const advance = (id) =>
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: FLOW[o.status].next ?? o.status } : o))
    );

  const active = orders.filter((o) => o.status !== 'ENVIADO');
  const revenue = orders.reduce((acc, o) => acc + o.total, 0);
  const novos = orders.filter((o) => o.status === 'NOVO').length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const name = user?.nome || 'Estabelecimento';
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="screen role-screen">
      <header className="role-header">
        <div className="role-header-user">
          <div className="role-avatar shop">{initial}</div>
          <div>
            <span className="role-greeting">Painel do estabelecimento</span>
            <strong className="role-name">{name}</strong>
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

      <div className="role-stats">
        <div className="role-stat-card">
          <span className="role-stat-value">{novos}</span>
          <span className="role-stat-label">Novos</span>
        </div>
        <div className="role-stat-card">
          <span className="role-stat-value">{active.length}</span>
          <span className="role-stat-label">Em aberto</span>
        </div>
        <div className="role-stat-card">
          <span className="role-stat-value gold">R$ {revenue.toFixed(2).replace('.', ',')}</span>
          <span className="role-stat-label">Faturamento</span>
        </div>
      </div>

      <div className="role-section">
        <h2 className="section-title">Pedidos recebidos</h2>

        {active.length === 0 && (
          <div className="role-empty">
            <span>Nenhum pedido em aberto.</span>
            <span className="role-empty-sub">Novos pedidos aparecem aqui automaticamente.</span>
          </div>
        )}

        <div className="role-list">
          {active.map((o) => (
            <div key={o.id} className="role-card">
              <div className="role-card-top">
                <div>
                  <span className="role-card-tag">PEDIDO #{o.id} · {o.time}</span>
                  <strong className="role-card-title">{o.customer}</strong>
                </div>
                <span className={`role-badge status-${o.status.toLowerCase()}`}>
                  {FLOW[o.status].label}
                </span>
              </div>

              <div className="role-order-items">
                {o.items.map((it, i) => (
                  <div key={i} className="role-order-item">{it}</div>
                ))}
              </div>

              <div className="role-card-footer">
                <span className="role-order-total">
                  R$ {o.total.toFixed(2).replace('.', ',')}
                </span>
                {FLOW[o.status].action && (
                  <button className="role-order-btn" onClick={() => advance(o.id)}>
                    {FLOW[o.status].action}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
