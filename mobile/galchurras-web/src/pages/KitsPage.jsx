import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { categories, kits, kitShopOffers } from '../data/mockData';

const KIT_COLORS = ['#7c2020', '#6b1a1a', '#5c1515', '#4a1010', '#7c2020', '#5c2010'];

const kitImageStyle = (image) =>
  image ? { backgroundImage: `linear-gradient(180deg, rgba(26,5,5,0.1) 30%, rgba(26,5,5,0.9) 100%), url(${image})` } : undefined;

const CATEGORY_ICONS = {
  bovino: '🥩',
  misto:  '🔥',
  frango: '🍗',
  suino:  '🥓',
};

export default function KitsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filteredKits = kits.filter(k => {
    const matchCat = activeCategory === 'all' || k.category === activeCategory;
    const matchSearch = k.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const minPrice = (kitId) => {
    const offers = kitShopOffers[kitId] || [];
    if (!offers.length) return null;
    return Math.min(...offers.map(o => o.price));
  };

  const shopCount = (kitId) => (kitShopOffers[kitId] || []).length;

  return (
    <div className="screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="page-title">Kits para churrasco</h1>
      </div>

      <div className="kits-page-body">
        <div className="search-bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Buscar picanha, costela, fraldinha..."
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

        <div className="category-pills">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-pill${activeCategory === cat.id ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.id !== 'all' && CATEGORY_ICONS[cat.id] && `${CATEGORY_ICONS[cat.id]} `}
              {cat.label}
            </button>
          ))}
        </div>

        <p className="kits-count">
          {filteredKits.length === 0
            ? 'Nenhum kit encontrado'
            : `${filteredKits.length} kit${filteredKits.length > 1 ? 's' : ''} disponíve${filteredKits.length > 1 ? 'is' : 'l'}`}
        </p>

        {filteredKits.length > 0 ? (
          <div className="kits-list">
            {filteredKits.map((kit, i) => (
              <div
                key={kit.id}
                className="kit-card-full"
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
                  <p className="kit-card-desc">{kit.description}</p>
                  <div className="kit-card-footer">
                    {minPrice(kit.id) && (
                      <span className="kit-card-price">
                        A partir de <strong>R$ {minPrice(kit.id).toFixed(2).replace('.', ',')}</strong>
                      </span>
                    )}
                    {shopCount(kit.id) > 0 && (
                      <span className="kit-card-shops">
                        {shopCount(kit.id)} açougue{shopCount(kit.id) > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="kits-empty">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <p>Nenhum kit encontrado</p>
            <span>Tente outro filtro ou termo de busca</span>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
