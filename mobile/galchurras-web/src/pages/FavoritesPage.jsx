import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { kits, butcherShops, shopItems, kitShopOffers, favorites as initialFavorites } from '../data/mockData';

const KIT_COLORS = ['#7c2020', '#6b1a1a', '#5c1515', '#4a1010'];

const kitImageStyle = (image) =>
  image ? { backgroundImage: `linear-gradient(180deg, rgba(26,5,5,0.1) 30%, rgba(26,5,5,0.9) 100%), url(${image})` } : undefined;

const TABS = [
  { id: 'kits',   label: 'Kits' },
  { id: 'shops',  label: 'Açougues' },
  { id: 'items',  label: 'Itens' },
];

function HeartIcon({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}

function EmptyState({ label }) {
  return (
    <div className="fav-empty">
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
      <p>Nenhum {label} favorito</p>
      <span>Explore e salve o que você mais gosta</span>
    </div>
  );
}

export default function FavoritesPage() {
  const navigate  = useNavigate();
  const [activeTab, setActiveTab] = useState('kits');

  const [favKitIds,  setFavKitIds]  = useState(new Set(initialFavorites.kitIds));
  const [favShopIds, setFavShopIds] = useState(new Set(initialFavorites.shopIds));
  const [favItemIds, setFavItemIds] = useState(new Set(initialFavorites.itemIds));

  const toggleKit  = (id) => setFavKitIds(prev  => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  const toggleShop = (id) => setFavShopIds(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  const toggleItem = (id) => setFavItemIds(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  const favKits  = kits.filter(k => favKitIds.has(k.id));
  const favShops = butcherShops.filter(s => favShopIds.has(s.id));

  const favItems = Object.entries(shopItems).flatMap(([shopId, items]) =>
    items
      .filter(item => favItemIds.has(item.id))
      .map(item => ({ ...item, shopId: Number(shopId), shopName: butcherShops.find(s => s.id === Number(shopId))?.name }))
  );

  const minPrice = (kitId) => {
    const offers = kitShopOffers[kitId] || [];
    if (!offers.length) return null;
    return Math.min(...offers.map(o => o.price));
  };

  const counts = { kits: favKits.length, shops: favShops.length, items: favItems.length };

  return (
    <div className="screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate('/account')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="page-title">Favoritos</h1>
      </div>

      {/* Tabs */}
      <div className="fav-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`fav-tab${activeTab === tab.id ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {counts[tab.id] > 0 && (
              <span className="fav-tab-count">{counts[tab.id]}</span>
            )}
          </button>
        ))}
      </div>

      <div className="fav-body">

        {/* ── Kits ── */}
        {activeTab === 'kits' && (
          favKits.length === 0 ? <EmptyState label="kit" /> : (
            <div className="fav-kits-list">
              {favKits.map((kit, i) => (
                <div key={kit.id} className="fav-kit-card" style={{ background: KIT_COLORS[i % KIT_COLORS.length] }}>
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

                  <button
                    className="fav-heart-btn active"
                    onClick={() => toggleKit(kit.id)}
                    aria-label="Remover dos favoritos"
                  >
                    <HeartIcon filled />
                  </button>

                  <div
                    className="kit-card-info fav-kit-clickable"
                    onClick={() => navigate(`/kit/${kit.id}`)}
                  >
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
          )
        )}

        {/* ── Açougues ── */}
        {activeTab === 'shops' && (
          favShops.length === 0 ? <EmptyState label="açougue" /> : (
            <div className="fav-list">
              {favShops.map(shop => (
                <div key={shop.id} className="shop-card-full" onClick={() => navigate(`/butcher/${shop.id}`)}>
                  <div className="shop-card-full-image" style={shop.image ? { backgroundImage: `url(${shop.image})` } : undefined} />
                  <div className="shop-card-full-body">
                    <div className="shop-card-full-top">
                      <div className="shop-card-full-name-row">
                        {shop.badge && <span className="shop-card-full-badge">{shop.badge}</span>}
                        <span className="shop-card-full-name">{shop.name}</span>
                      </div>
                      <div className="shop-card-full-rating">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--accent)" stroke="none">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span className="shop-card-full-rating-val">{shop.rating}</span>
                        <span className="shop-card-full-reviews">({shop.reviews})</span>
                      </div>
                    </div>
                    <span className="shop-card-full-address">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {shop.address}
                    </span>
                    <div className="shop-card-full-meta">
                      <div className="shop-meta-chip">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {shop.deliveryTime}
                      </div>
                      <div className="shop-meta-chip">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {shop.distance}
                      </div>
                    </div>
                  </div>
                  <button
                    className="fav-heart-btn active fav-heart-shop"
                    onClick={e => { e.stopPropagation(); toggleShop(shop.id); }}
                    aria-label="Remover dos favoritos"
                  >
                    <HeartIcon filled />
                  </button>
                </div>
              ))}
            </div>
          )
        )}

        {/* ── Itens ── */}
        {activeTab === 'items' && (
          favItems.length === 0 ? <EmptyState label="item" /> : (
            <div className="fav-list">
              {favItems.map(item => (
                <div
                  key={item.id}
                  className="fav-item-card"
                  onClick={() => navigate(`/butcher/${item.shopId}`)}
                >
                  <div className="fav-item-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3h18M3 9h18M3 15h18M3 21h18" />
                    </svg>
                  </div>
                  <div className="fav-item-body">
                    <span className="fav-item-name">{item.name}</span>
                    <span className="fav-item-meta">{item.unit} · {item.shopName}</span>
                  </div>
                  <span className="fav-item-price">R$ {item.price.toFixed(2).replace('.', ',')}</span>
                  <button
                    className="fav-heart-btn active"
                    onClick={e => { e.stopPropagation(); toggleItem(item.id); }}
                    aria-label="Remover dos favoritos"
                  >
                    <HeartIcon filled />
                  </button>
                </div>
              ))}
            </div>
          )
        )}

      </div>

      <BottomNav />
    </div>
  );
}
