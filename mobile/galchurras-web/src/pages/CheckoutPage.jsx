import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  butcherShops, shopKits, shopItems,
  addresses, paymentMethods, DELIVERY_FEE,
} from '../data/mockData';

/* ── Ícones de pagamento ─────────────────────── */
function PixIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L6.5 7.5M12 2L17.5 7.5M12 22L6.5 16.5M12 22L17.5 16.5M2 12L7.5 6.5M2 12L7.5 17.5M22 12L16.5 6.5M22 12L16.5 17.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="3" fill="currentColor"/>
    </svg>
  );
}
function CardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2"/>
      <line x1="2" y1="10" x2="22" y2="10"/>
    </svg>
  );
}
function CashIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"/>
      <circle cx="12" cy="12" r="3"/>
      <path d="M6 12h.01M18 12h.01"/>
    </svg>
  );
}
const PAYMENT_ICONS = { pix: <PixIcon />, card: <CardIcon />, cash: <CashIcon /> };

/* ── Stepper ─────────────────────────────────── */
function Stepper({ qty, onAdd, onRemove }) {
  return (
    <div className="stepper">
      <button className="stepper-btn" onClick={onRemove}>−</button>
      <span className="stepper-qty">{qty}</span>
      <button className="stepper-btn add" onClick={onAdd}>+</button>
    </div>
  );
}

/* ── Página ──────────────────────────────────── */
export default function CheckoutPage() {
  const { shopId, kitId } = useParams();
  const navigate = useNavigate();

  const shop    = butcherShops.find((s) => s.id === Number(shopId));
  const shopKit = (shopKits[Number(shopId)] || []).find((k) => k.kitId === Number(kitId));
  const avulsos = shopItems[Number(shopId)] || [];

  const [extraItems, setExtraItems]       = useState({});   // { itemId: qty }
  const [avulsosExpanded, setAvulsosExpanded] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0].id);
  const [selectedPayment, setSelectedPayment] = useState('pix');
  const [confirmed, setConfirmed]         = useState(false);

  if (!shop || !shopKit) {
    return (
      <div className="screen" style={{ padding: '2rem', color: 'var(--text-primary)' }}>
        <button style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '1rem' }} onClick={() => navigate(-1)}>
          ← Voltar
        </button>
        <p>Pedido não encontrado.</p>
      </div>
    );
  }

  /* totais */
  const extrasTotal = Object.entries(extraItems).reduce((acc, [id, qty]) => {
    const item = avulsos.find((i) => i.id === id);
    return acc + (item ? item.price * qty : 0);
  }, 0);
  const subtotal = shopKit.price + extrasTotal;
  const total    = subtotal + DELIVERY_FEE;

  const addItem = (id) =>
    setExtraItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

  const removeItem = (id) =>
    setExtraItems((prev) => {
      const next = { ...prev };
      if ((next[id] || 0) <= 1) delete next[id];
      else next[id] -= 1;
      return next;
    });

  const addedEntries = Object.entries(extraItems).filter(([, qty]) => qty > 0);

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => navigate('/orders'), 2200);
  };

  if (confirmed) {
    return (
      <div className="screen checkout-success">
        <div className="checkout-success-inner">
          <div className="checkout-success-icon">🔥</div>
          <h2>Pedido confirmado!</h2>
          <p>Seu kit está sendo preparado pelo <strong>{shop.name}</strong>.</p>
          <p className="checkout-success-time">Previsão de entrega: {shop.deliveryTime}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen checkout-screen">
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" style={{ position: 'static' }} onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <h1 className="page-title">Confirmar pedido</h1>
      </div>

      <div className="checkout-body">

        {/* ── Seção 1: Seu pedido ─────────────── */}
        <section className="checkout-section">
          <h2 className="checkout-section-title">Seu pedido</h2>

          {/* Kit base */}
          <div className="checkout-kit-card">
            <div className="checkout-kit-thumb" />
            <div className="checkout-kit-info">
              <span className="checkout-kit-badge">{shopKit.badge}</span>
              <span className="checkout-kit-name">{shopKit.name}</span>
              <div className="checkout-kit-shop">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {shop.name}
              </div>
              <div className="checkout-kit-serves">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                  <path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
                {shopKit.serves}
              </div>
            </div>
            <span className="checkout-kit-price-tag">
              R$ {shopKit.price.toFixed(2).replace('.', ',')}
            </span>
          </div>

          {/* Itens incluídos no kit */}
          <div className="checkout-items-list">
            <span className="checkout-items-label">INCLUÍDOS NO KIT</span>
            {shopKit.items.map((item) => (
              <div key={item.name} className="checkout-item-row">
                <span className="checkout-item-name">{item.name}</span>
                <span className="checkout-item-qty">{item.qty}</span>
                <span className="checkout-item-included">incluso</span>
              </div>
            ))}
          </div>

          {/* Extras já adicionados */}
          {addedEntries.length > 0 && (
            <div className="checkout-extras-added">
              <span className="checkout-items-label">ITENS EXTRAS</span>
              {addedEntries.map(([id, qty]) => {
                const item = avulsos.find((i) => i.id === id);
                if (!item) return null;
                return (
                  <div key={id} className="checkout-extra-row">
                    <div className="checkout-extra-info">
                      <span className="checkout-extra-name">{item.name}</span>
                      <span className="checkout-extra-unit">{item.unit}</span>
                    </div>
                    <Stepper
                      qty={qty}
                      onAdd={() => addItem(id)}
                      onRemove={() => removeItem(id)}
                    />
                    <span className="checkout-extra-price">
                      R$ {(item.price * qty).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── Seção 2: Adicionar itens ─────────── */}
        <section className="checkout-section">
          <h2 className="checkout-section-title">
            Adicionar do {shop.name}
          </h2>

          <div className="avulsos-list">
            {(avulsosExpanded ? avulsos : avulsos.slice(0, 2)).map((item) => {
              const qty = extraItems[item.id] || 0;
              return (
                <div key={item.id} className="avulso-row">
                  <div className="avulso-info">
                    <span className="avulso-name">{item.name}</span>
                    <span className="avulso-unit">{item.unit}</span>
                  </div>
                  <span className="avulso-price">
                    R$ {item.price.toFixed(2).replace('.', ',')}
                  </span>
                  {qty > 0 ? (
                    <Stepper
                      qty={qty}
                      onAdd={() => addItem(item.id)}
                      onRemove={() => removeItem(item.id)}
                    />
                  ) : (
                    <button className="avulso-add-btn" onClick={() => addItem(item.id)}>
                      +
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {avulsos.length > 2 && (
            <button
              className="avulsos-expand-btn"
              onClick={() => setAvulsosExpanded((v) => !v)}
            >
              {avulsosExpanded ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 15l-6-6-6 6"/></svg>
                  Ver menos
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                  Ver mais {avulsos.length - 2} {avulsos.length - 2 === 1 ? 'item' : 'itens'}
                </>
              )}
            </button>
          )}
        </section>

        {/* ── Seção 3: Endereço ────────────────── */}
        <section className="checkout-section">
          <h2 className="checkout-section-title">Endereço de entrega</h2>

          <div className="checkout-address-list">
            {addresses.map((addr) => (
              <button
                key={addr.id}
                className={`checkout-address-card${selectedAddress === addr.id ? ' selected' : ''}`}
                onClick={() => setSelectedAddress(addr.id)}
              >
                <div className="checkout-address-radio">
                  <div className="radio-outer">
                    {selectedAddress === addr.id && <div className="radio-inner" />}
                  </div>
                </div>
                <div className="checkout-address-icon">
                  {addr.label === 'Casa' ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                      <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2"/>
                      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                    </svg>
                  )}
                </div>
                <div className="checkout-address-text">
                  <span className="checkout-address-label">{addr.label}</span>
                  <span className="checkout-address-street">{addr.street}</span>
                  <span className="checkout-address-complement">{addr.complement}</span>
                </div>
              </button>
            ))}

            <button className="checkout-add-address">
              <span className="checkout-add-icon">+</span>
              Novo endereço
            </button>
          </div>
        </section>

        {/* ── Seção 4: Pagamento ───────────────── */}
        <section className="checkout-section">
          <h2 className="checkout-section-title">Pagamento</h2>

          <div className="checkout-payment-list">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                className={`checkout-payment-card${selectedPayment === method.id ? ' selected' : ''}`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <div className="checkout-address-radio">
                  <div className="radio-outer">
                    {selectedPayment === method.id && <div className="radio-inner" />}
                  </div>
                </div>
                <div className="checkout-payment-icon">
                  {PAYMENT_ICONS[method.icon]}
                </div>
                <div className="checkout-payment-text">
                  <span className="checkout-payment-label">{method.label}</span>
                  <span className="checkout-payment-sub">{method.sub}</span>
                </div>
                {method.id === 'pix' && (
                  <span className="checkout-payment-tag">Recomendado</span>
                )}
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* ── Footer fixo ──────────────────────── */}
      <div className="checkout-footer">
        <div className="checkout-totals">
          <div className="checkout-total-row">
            <span>Kit</span>
            <span>R$ {shopKit.price.toFixed(2).replace('.', ',')}</span>
          </div>
          {extrasTotal > 0 && (
            <div className="checkout-total-row">
              <span>Itens extras</span>
              <span>R$ {extrasTotal.toFixed(2).replace('.', ',')}</span>
            </div>
          )}
          <div className="checkout-total-row">
            <span>Taxa de entrega</span>
            <span>R$ {DELIVERY_FEE.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="checkout-total-row total">
            <span>Total</span>
            <span>R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>
        <button className="btn-primary checkout-confirm-btn" onClick={handleConfirm}>
          Fazer pedido · R$ {total.toFixed(2).replace('.', ',')}
        </button>
      </div>
    </div>
  );
}
