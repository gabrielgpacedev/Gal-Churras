import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { categories, kits, butcherShops, kitShopOffers, shopKits, WEEKLY_PROMO } from '../data/mockData';
import { useCart } from '../context/CartContext';

const KIT_COLORS = ['#7c2020', '#6b1a1a', '#5c1515', '#4a1010'];

const kitImageStyle = (image) =>
  image ? { backgroundImage: `linear-gradient(180deg, rgba(26,5,5,0.1) 30%, rgba(26,5,5,0.9) 100%), url(${image})` } : undefined;

const { shopId: PROMO_SHOP_ID, kitId: PROMO_KIT_ID } = WEEKLY_PROMO;
const promoShop = butcherShops.find(s => s.id === PROMO_SHOP_ID);
const promoShopKit = shopKits[PROMO_SHOP_ID]?.find(sk => sk.kitId === PROMO_KIT_ID);

export default function HomePage() {
  const navigate = useNavigate();
  const { addKit } = useCart();
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

      <div
        className="home-banner"
        style={WEEKLY_PROMO.image ? { backgroundImage: `linear-gradient(180deg, rgba(46,8,8,0.45) 0%, rgba(26,5,5,0.88) 100%), url(${WEEKLY_PROMO.image})` } : undefined}
        onClick={() => { if (promoShopKit && addKit(promoShopKit, { promo: true })) navigate('/checkout'); }}
      >
        <span className="banner-tag">✦ Promoção da semana</span>



        <h2 className="banner-title">{promoShopKit.name}</h2>
        <p className="banner-kit-badge">{promoShopKit.badge}</p>

        <div className="banner-shop-row">
          <span className="banner-shop-name">{promoShop.name}</span>
          <span className="banner-shop-rating">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="var(--accent)" stroke="none">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {promoShop.rating}
          </span>
        </div>



        <div className="banner-footer">
          <div className="banner-price-block">
            <span className="banner-price-label">a partir de</span>
            <span className="banner-price">R$ {promoShopKit.price.toFixed(2).replace('.', ',')}</span>
          </div>
          <span className="banner-cta">
            Ver oferta
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
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
          <button className="see-all" onClick={() => navigate('/kits')}>Ver tudo</button>
        </div>

        <div className="kits-list">
          {filteredKits.map((kit, i) => (
            <div
              key={kit.id}
              className="kit-card-home"
              style={{ background: KIT_COLORS[i % KIT_COLORS.length] }}
              onClick={() => navigate(`/kit/${kit.id}`)}
            >
              <div className="kit-card-image-placeholder" style={kitImageStyle(kit.image)} />
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
          <button className="see-all" onClick={() => navigate('/shops')}>Ver tudo</button>
        </div>

        <div className="shops-list">
          {butcherShops.map((shop) => (
            <div
              key={shop.id}
              className="shop-card-home"
              onClick={() => navigate(`/butcher/${shop.id}`)}
            >
              <div className="shop-card-image" style={shop.image ? { backgroundImage: `url(${shop.image})` } : undefined} />
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
