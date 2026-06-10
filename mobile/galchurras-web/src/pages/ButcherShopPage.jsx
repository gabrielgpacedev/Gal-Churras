import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { butcherShops, shopKits, shopItems } from '../data/mockData';
import { useCart } from '../context/CartContext';

export default function ButcherShopPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('kits');
  const { addKit, addItem, increment, decrement, qtyOf } = useCart();
  const shop = butcherShops.find((s) => s.id === Number(id));
  const kits = shopKits[Number(id)] || [];
  const items = shopItems[Number(id)] || [];

  if (!shop) return <div className="screen"><p style={{ color: '#f5e6c8', padding: '2rem' }}>Açougue não encontrado.</p></div>;

  return (
    <div className="screen">
      <div className="shop-hero">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <div className="shop-rating-badge">⭐ {shop.rating}</div>
        <div className="shop-hero-image" style={shop.image ? { backgroundImage: `url(${shop.image})` } : undefined} />
      </div>

      <div className="shop-info">
        {shop.badge && <span className="shop-premium-badge">{shop.badge}</span>}
        <h1 className="shop-name">{shop.name}</h1>
        <div className="shop-address-row">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {shop.address}
        </div>
        <div className="shop-meta-row">
          <span>⭐ {shop.rating} ({(shop.reviews || 0).toLocaleString('pt-BR')})</span>
          <span>📍 {shop.distance}</span>
          <span>🕐 {shop.deliveryTime}</span>
        </div>
      </div>

      <div className="kit-builder-banner" onClick={() => navigate('/')}>
        <div className="kit-builder-icon">🔧</div>
        <div>
          <strong>Montar meu kit</strong>
          <p>Personalize com itens deste açougue</p>
        </div>
      </div>

      <div className="shop-tabs">
        <button
          className={`shop-tab${activeTab === 'kits' ? ' active' : ''}`}
          onClick={() => setActiveTab('kits')}
        >
          Kits
        </button>
        <button
          className={`shop-tab${activeTab === 'items' ? ' active' : ''}`}
          onClick={() => setActiveTab('items')}
        >
          Itens gerais
        </button>
      </div>

      <div className="shop-content">
        {activeTab === 'kits' && (
          <div className="shop-kits-list">
            {kits.map((kit) => (
              <div key={kit.id} className="shop-kit-card">
                <div className="shop-kit-header">
                  <div className="shop-kit-thumb" style={kit.image ? { backgroundImage: `url(${kit.image})` } : undefined} />
                  <div className="shop-kit-meta">
                    <span className="shop-kit-badge">{kit.badge}</span>
                    <div className="shop-kit-title-row">
                      <span className="shop-kit-name">{kit.name}</span>
                      <span className="shop-kit-price">R$ {kit.price.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="shop-kit-serves">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 00-3-3.87" />
                        <path d="M16 3.13a4 4 0 010 7.75" />
                      </svg>
                      {kit.serves}
                    </div>
                  </div>
                </div>
                <div className="shop-kit-items">
                  {kit.items.map((item) => (
                    <div key={item.name} className="shop-kit-item-row">
                      <span>{item.name}</span>
                      <span>{item.qty}</span>
                    </div>
                  ))}
                </div>
                {qtyOf(`kit-${kit.id}`) > 0 ? (
                  <div className="shop-kit-in-cart">
                    <div className="stepper">
                      <button className="stepper-btn" onClick={() => decrement(`kit-${kit.id}`)}>−</button>
                      <span className="stepper-qty">{qtyOf(`kit-${kit.id}`)}</span>
                      <button className="stepper-btn add" onClick={() => increment(`kit-${kit.id}`)}>+</button>
                    </div>
                    <span className="shop-kit-in-cart-label">no carrinho</span>
                  </div>
                ) : (
                  <button
                    className="btn-primary shop-kit-btn"
                    onClick={() => addKit(kit)}
                  >
                    Adicionar ao carrinho
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'items' && (
          <div className="avulsos-list">
            {items.map((item) => {
              const qty = qtyOf(`item-${item.id}`);
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
                    <div className="stepper">
                      <button className="stepper-btn" onClick={() => decrement(`item-${item.id}`)}>−</button>
                      <span className="stepper-qty">{qty}</span>
                      <button className="stepper-btn add" onClick={() => increment(`item-${item.id}`)}>+</button>
                    </div>
                  ) : (
                    <button className="avulso-add-btn" onClick={() => addItem(shop.id, item)}>
                      +
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
