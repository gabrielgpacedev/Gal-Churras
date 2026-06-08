import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { butcherShops, shopKits } from '../data/mockData';

export default function ButcherShopPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('kits');
  const shop = butcherShops.find((s) => s.id === Number(id));
  const kits = shopKits[Number(id)] || [];

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
        <div className="shop-hero-image" />
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
                  <div className="shop-kit-thumb" />
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
                <button
                  className="btn-primary shop-kit-btn"
                  onClick={() => navigate(`/checkout/${shop.id}/${kit.kitId}`)}
                >
                  Pedir kit
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'items' && (
          <div className="shop-items-empty">
            <p>Itens avulsos em breve</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
