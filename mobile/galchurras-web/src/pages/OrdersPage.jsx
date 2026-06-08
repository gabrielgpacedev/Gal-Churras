import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { orders } from '../data/mockData';

const STATUS_STEPS = ['preparing', 'on_the_way', 'delivered'];
const STATUS_LABELS = {
  preparing: 'Preparando',
  on_the_way: 'Saiu p/ entrega',
  delivered: 'Entregue',
};
const STATUS_ICONS = {
  preparing: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  on_the_way: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  delivered: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

function OrderStatusBar({ status }) {
  const currentIdx = STATUS_STEPS.indexOf(status);
  return (
    <div className="order-status-bar">
      {STATUS_STEPS.map((step, idx) => (
        <div key={step} className="order-status-step">
          <div className={`order-status-dot${idx <= currentIdx ? ' active' : ''}`}>
            {STATUS_ICONS[step]}
          </div>
          <span className={`order-status-label${idx <= currentIdx ? ' active' : ''}`}>
            {STATUS_LABELS[step]}
          </span>
          {idx < STATUS_STEPS.length - 1 && (
            <div className={`order-status-line${idx < currentIdx ? ' active' : ''}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function OrdersPage() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <h1 className="page-title">Meus pedidos</h1>
      </div>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-card-top">
              <div className="order-thumb" />
              <div className="order-info">
                <div className="order-name-price">
                  <span className="order-name">{order.kitName} · {order.shopName.length > 12 ? order.shopName.slice(0, 12) + '...' : order.shopName}</span>
                  <span className="order-price">R$ {order.price.toFixed(2).replace('.', ',')}</span>
                </div>
                <span className="order-shop">{order.shopName} · {order.qty}x</span>
                <span className="order-date">#{order.id} · {order.date}</span>
              </div>
            </div>

            <OrderStatusBar status={order.status} />

            <div className="order-card-footer">
              <span className="order-address">Entrega: {order.address}</span>
              <button className="order-advance-btn">Avançar status ›</button>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
