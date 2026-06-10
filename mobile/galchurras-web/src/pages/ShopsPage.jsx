import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { butcherShops } from '../data/mockData';

const SORT_OPTIONS = [
  { id: 'rating',   label: 'Melhor avaliação' },
  { id: 'distance', label: 'Mais próximo' },
  { id: 'time',     label: 'Mais rápido' },
];

const parseDistance = (str) => parseFloat(str.replace(' km', '').replace(',', '.'));
const parseTime     = (str) => parseInt(str.replace(' min', ''), 10);

export default function ShopsPage() {
  const navigate = useNavigate();
  const [search, setSearch]   = useState('');
  const [sortBy, setSortBy]   = useState('rating');

  const filtered = butcherShops
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
    .slice()
    .sort((a, b) => {
      if (sortBy === 'rating')   return b.rating - a.rating;
      if (sortBy === 'distance') return parseDistance(a.distance) - parseDistance(b.distance);
      if (sortBy === 'time')     return parseTime(a.deliveryTime) - parseTime(b.deliveryTime);
      return 0;
    });

  return (
    <div className="screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="page-title">Açougues</h1>
      </div>

      <div className="shops-page-body">
        <div className="search-bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Buscar açougue..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="kits-search-clear" onClick={() => setSearch('')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        <div className="shops-sort-row">
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.id}
              className={`shops-sort-pill${sortBy === opt.id ? ' active' : ''}`}
              onClick={() => setSortBy(opt.id)}
            >
              {sortBy === opt.id && (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {opt.label}
            </button>
          ))}
        </div>

        <p className="kits-count">
          {filtered.length === 0
            ? 'Nenhum açougue encontrado'
            : `${filtered.length} açougue${filtered.length > 1 ? 's' : ''} encontrado${filtered.length > 1 ? 's' : ''}`}
        </p>

        {filtered.length > 0 ? (
          <div className="shops-page-list">
            {filtered.map(shop => (
              <div
                key={shop.id}
                className="shop-card-full"
                onClick={() => navigate(`/butcher/${shop.id}`)}
              >
                <div className="shop-card-full-image" style={shop.image ? { backgroundImage: `url(${shop.image})` } : undefined} />
                <div className="shop-card-full-body">
                  <div className="shop-card-full-top">
                    <div className="shop-card-full-name-row">
                      {shop.badge && <span className="shop-card-full-badge">{shop.badge}</span>}
                      <span className="shop-card-full-name">{shop.name}</span>
                    </div>
                    <div className="shop-card-full-rating">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--accent)" stroke="none">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
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

                <svg className="shop-card-full-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            ))}
          </div>
        ) : (
          <div className="kits-empty">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <p>Nenhum açougue encontrado</p>
            <span>Tente outro termo de busca</span>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
