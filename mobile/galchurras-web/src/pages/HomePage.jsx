import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { categories, kits, butcherShops, kitShopOffers } from '../data/mockData';

const KIT_COLORS = ['#7c2020', '#6b1a1a', '#5c1515', '#4a1010'];

export default function HomePage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filteredKits = kits.filter((k) => {
    const matchCat = activeCategory === 'all' || k.category === activeCategory;
    const matchSearch = k.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const minPrice = (kitId) => {
    const offers = kitShopOffers[kitId] || [];
    if (!offers.length) return null;
    return Math.min(...offers.map((o) => o.price));
  };

  return (
    <div className="screen">
      <div className="home-header">
        <div className="home-location">
          <span className="location-label">ENTREGAR EM</span>
          <div className="location-value">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <strong>Vila Madalena</strong> · SP
          </div>
        </div>
        <div className="home-avatar">R</div>
      </div>

      <div className="home-banner">
        <span className="banner-tag">✦ Promoção da semana</span>
        <h2 className="banner-title">
          Churrasco<br />
          <em>na sua porta</em>
        </h2>
        <p className="banner-sub">Kits prontos dos melhores açougues, entregues em até 60 min.</p>
      </div>

      <div className="home-content">
        <div className="search-bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Buscar picanha, costela, fraldinha..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-pill${activeCategory === cat.id ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="section-header">
          <div>
            <h3 className="section-title">Kits para churrasco</h3>
            <p className="section-sub">Selecionados pertinho de você</p>
          </div>
          <button className="see-all">Ver tudo</button>
        </div>

        <div className="kits-list">
          {filteredKits.map((kit, i) => (
            <div
              key={kit.id}
              className="kit-card-home"
              style={{ background: KIT_COLORS[i % KIT_COLORS.length] }}
              onClick={() => navigate(`/kit/${kit.id}`)}
            >
              <div className="kit-card-image-placeholder" />
              <div className="kit-card-badge-serves">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
                {kit.serves}
              </div>
              <div className="kit-card-info">
                <span className="kit-card-tag">{kit.badge}</span>
                <span className="kit-card-name">{kit.name}</span>
                {minPrice(kit.id) && (
                  <span className="kit-card-price">
                    A partir de <strong>R$ {minPrice(kit.id).toFixed(2).replace('.', ',')}</strong>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="section-header" style={{ marginTop: '1.5rem' }}>
          <div>
            <h3 className="section-title">Açougues próximos</h3>
            <p className="section-sub">Avaliados pela comunidade</p>
          </div>
          <button className="see-all">Ver tudo</button>
        </div>

        <div className="shops-list">
          {butcherShops.map((shop) => (
            <div
              key={shop.id}
              className="shop-card-home"
              onClick={() => navigate(`/butcher/${shop.id}`)}
            >
              <div className="shop-card-image" />
              <div className="shop-card-info">
                <div className="shop-card-top">
                  <span className="shop-card-name">{shop.name}</span>
                  <span className="shop-card-rating">⭐ {shop.rating}</span>
                </div>
                <span className="shop-card-address">{shop.address}</span>
                <div className="shop-card-meta">
                  <span>🕐 {shop.deliveryTime}</span>
                  <span>📍 {shop.distance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
