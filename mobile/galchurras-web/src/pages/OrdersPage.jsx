import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { orders as initialOrders, CANCEL_REASONS, SHOP_IMAGES } from '../data/mockData';

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
  const stepState = (idx) =>
    idx < currentIdx ? ' done' : idx === currentIdx ? ' current' : '';
  return (
    <div className="order-status-bar">
      {STATUS_STEPS.map((step, idx) => (
        <div key={step} className="order-status-step">
          <div className={`order-status-dot${stepState(idx)}`}>
            {STATUS_ICONS[step]}
          </div>
          <span className={`order-status-label${stepState(idx)}`}>
            {STATUS_LABELS[step]}
          </span>
          {idx < STATUS_STEPS.length - 1 && (
            <div className={`order-status-line${idx < currentIdx ? ' done' : ''}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function MessageSheet({ shopName, onClose, onSend }) {
  const [message, setMessage] = useState('');
  return (
    <div className="addr-overlay" onClick={onClose}>
      <div className="addr-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="addr-sheet-handle" />
        <h2 className="addr-sheet-title">Mensagem para {shopName}</h2>
        <textarea
          className="order-textarea"
          rows={4}
          autoFocus
          placeholder="Escreva sua mensagem para o estabelecimento..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="btn-primary"
          disabled={!message.trim()}
          onClick={() => onSend(message.trim())}
        >
          Enviar mensagem
        </button>
      </div>
    </div>
  );
}

function CancelSheet({ onClose, onConfirm }) {
  const [reason, setReason] = useState(null);
  const [note, setNote] = useState('');
  return (
    <div className="addr-overlay" onClick={onClose}>
      <div className="addr-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="addr-sheet-handle" />
        <h2 className="addr-sheet-title">Por que deseja cancelar?</h2>

        <div className="cancel-reasons">
          {CANCEL_REASONS.map((option) => (
            <button
              key={option}
              className={`cancel-reason${reason === option ? ' selected' : ''}`}
              onClick={() => setReason(option)}
            >
              <span className="cancel-radio" />
              {option}
            </button>
          ))}
        </div>

        <textarea
          className="order-textarea"
          rows={3}
          placeholder="Quer nos contar mais? (opcional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button
          className="btn-primary btn-danger"
          disabled={!reason}
          onClick={() => onConfirm(reason, note.trim())}
        >
          Confirmar cancelamento
        </button>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const navigate = useNavigate();
  const [activeOrders, setActiveOrders] = useState(initialOrders);
  const [cancelingOrder, setCancelingOrder] = useState(null);
  const [messagingOrder, setMessagingOrder] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (text) => {
    setToast(text);
    setTimeout(() => setToast(null), 3500);
  };

  const handleCancelConfirm = () => {
    setActiveOrders((prev) => prev.filter((o) => o.id !== cancelingOrder.id));
    setCancelingOrder(null);
    showToast('Pedido cancelado com sucesso');
  };

  const handleSendMessage = () => {
    setMessagingOrder(null);
    showToast(`Mensagem enviada para ${messagingOrder.shopName}`);
  };

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

      {toast && <div className="order-toast">{toast}</div>}

      {activeOrders.length === 0 ? (
        <div className="fav-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <path d="M3 6h18M16 10a4 4 0 01-8 0" />
          </svg>
          <p>Você não possui pedidos ativos no momento</p>
          <span>Quando fizer um pedido, ele aparecerá aqui.</span>
        </div>
      ) : (
        <div className="orders-list">
          {activeOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-card-head">
                <div
                  className="order-shop-thumb"
                  style={SHOP_IMAGES[order.shopId] ? { backgroundImage: `url(${SHOP_IMAGES[order.shopId]})` } : undefined}
                />
                <div className="order-head-info">
                  <span className="order-shop-name">{order.shopName}</span>
                  <span className="order-meta">Pedido #{order.id} · {order.date}</span>
                </div>
                <span className="order-status-badge">{STATUS_LABELS[order.status]}</span>
              </div>

              <OrderStatusBar status={order.status} />

              <div className="order-times">
                <div className="order-time-block">
                  <span className="order-time-label">Realizado às</span>
                  <span className="order-time-value">{order.placedAt}</span>
                </div>
                <div className="order-time-block">
                  <span className="order-time-label">Previsão de entrega</span>
                  <span className="order-time-value">{order.eta}</span>
                </div>
              </div>

              <div className="order-items">
                <span className="order-section-label">Itens do pedido</span>
                <div className="order-item-row order-item-kit">
                  <span>{order.qty}x {order.kitName}</span>
                </div>
                {order.items.map((item) => (
                  <div key={item.name} className="order-item-row">
                    <span>{item.name}</span>
                    <span className="order-item-qty">{item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="order-total-row">
                <span className="order-total-label">Total</span>
                <span className="order-total-value">
                  R$ {order.price.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <div className="order-address-row">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Entrega em: {order.address}</span>
              </div>

              <div className="order-actions">
                <button className="order-msg-btn" onClick={() => setMessagingOrder(order)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                  Enviar mensagem
                </button>
                <button className="order-cancel-btn" onClick={() => setCancelingOrder(order)}>
                  Cancelar pedido
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {messagingOrder && (
        <MessageSheet
          shopName={messagingOrder.shopName}
          onClose={() => setMessagingOrder(null)}
          onSend={handleSendMessage}
        />
      )}

      {cancelingOrder && (
        <CancelSheet
          onClose={() => setCancelingOrder(null)}
          onConfirm={handleCancelConfirm}
        />
      )}

      <BottomNav />
    </div>
  );
}
