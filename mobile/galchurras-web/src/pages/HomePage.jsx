import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { currentUser } from '../data/mockData';
import { listarCategoriasKit, listarKits, listarEstabelecimentos } from '../services/catalog';

const KIT_COLORS = ['#7c2020', '#6b1a1a', '#5c1515', '#4a1010'];

const money = (v) => {
  if (v == null || v === '') return null;
  const n = typeof v === 'number' ? v : Number(String(v).replace(/[^0-9.,]/g, '').replace(',', '.'));
  if (Number.isNaN(n)) return null;
  return `R$ ${n.toFixed(2).replace('.', ',')}`;
};

// A API não fornece imagens; onde houver uma, é usada como fundo,
// caso contrário mostramos o aviso pedido no lugar da imagem.
function MediaFallback({ small }) {
  return (
    <div className={`media-fallback${small ? ' media-fallback-sm' : ''}`}>
      Não foi possível encontrar a imagem
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const [categorias, setCategorias] = useState([]);
  const [shops, setShops] = useState([]);
  const [kits, setKits] = useState([]);

  const [loading, setLoading] = useState(true);   // shell inicial (categorias + açougues)
  const [loadingKits, setLoadingKits] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  const avatar = (currentUser?.name || 'G').charAt(0).toUpperCase();
  const city = currentUser?.location?.city || 'Vila Madalena';
  const state = currentUser?.location?.state || 'SP';

  // Categorias + açougues (uma vez por reload)
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    Promise.all([listarCategoriasKit(), listarEstabelecimentos()])
      .then(([cats, s]) => {
        if (!active) return;
        setCategorias(cats);
        setShops(s);
      })
      .catch((e) => active && setError(e.message || 'Erro ao carregar a página.'))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [reloadKey]);

  // Kits — recarrega ao trocar de categoria (filtro feito na API)
  useEffect(() => {
    let active = true;
    setLoadingKits(true);
    const categoriaId = activeCategory === 'all' ? undefined : activeCategory;
    listarKits(categoriaId)
      .then((k) => active && setKits(k))
      .catch(() => active && setKits([]))
      .finally(() => active && setLoadingKits(false));
    return () => {
      active = false;
    };
  }, [activeCategory, reloadKey]);

  const filteredKits = kits.filter((k) =>
    (k.nome || '').toLowerCase().includes(search.toLowerCase())
  );

  // Destaque da semana: primeiro kit disponível
  const promoKit = kits[0];

  const goToKit = (kit) =>
    navigate(`/kit/${kit.id}`, { state: { nome: kit.nome, categoria: kit.categoria } });

  const pills = [{ id: 'all', label: 'Todos' }, ...categorias.map((c) => ({ id: c.id, label: c.descricao }))];

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
            <strong>{city}</strong> · {state}
          </div>
        </div>
        <div className="home-avatar">{avatar}</div>
      </div>

      {promoKit && (
        <div className="home-banner" onClick={() => goToKit(promoKit)}>
          <MediaFallback />
          <span className="banner-tag">✦ Promoção da semana</span>

          <h2 className="banner-title">{promoKit.nome}</h2>

          <div className="banner-footer">
            <div className="banner-price-block">
              <span className="banner-price-label">a partir de</span>
              {money(promoKit.valor) && <span className="banner-price">{money(promoKit.valor)}</span>}
            </div>
            <span className="banner-cta">
              Ver oferta
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      )}

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
          {pills.map((cat) => (
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

        {error && !loading ? (
          <div className="catalog-state catalog-error">
            <p>{error}</p>
            <button className="btn-primary catalog-retry" onClick={() => setReloadKey((k) => k + 1)}>
              Tentar novamente
            </button>
          </div>
        ) : loadingKits ? (
          <div className="catalog-state">Carregando kits…</div>
        ) : filteredKits.length === 0 ? (
          <p className="catalog-empty">Nenhum kit encontrado.</p>
        ) : (
          <div className="kits-list">
            {filteredKits.map((kit, i) => (
              <div
                key={kit.id}
                className="kit-card-home"
                style={{ background: KIT_COLORS[i % KIT_COLORS.length] }}
                onClick={() => goToKit(kit)}
              >
                <div className="kit-card-image-placeholder">
                  <MediaFallback />
                </div>
                <div className="kit-card-info">
                  <span className="kit-card-name">{kit.nome}</span>
                  {money(kit.valor) && (
                    <span className="kit-card-price">
                      A partir de <strong>{money(kit.valor)}</strong>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="section-header" style={{ marginTop: '1.5rem' }}>
          <div>
            <h3 className="section-title">Açougues próximos</h3>
            <p className="section-sub">Avaliados pela comunidade</p>
          </div>
          <button className="see-all" onClick={() => navigate('/shops')}>Ver tudo</button>
        </div>

        {loading ? (
          <div className="catalog-state">Carregando açougues…</div>
        ) : shops.length === 0 ? (
          <p className="catalog-empty">Nenhum estabelecimento cadastrado.</p>
        ) : (
          <div className="shops-list">
            {shops.map((shop) => (
              <div
                key={shop.id}
                className="shop-card-home"
                onClick={() => navigate(`/butcher/${shop.id}`)}
              >
                <div className="shop-card-image">
                  <MediaFallback small />
                </div>
                <div className="shop-card-info">
                  <div className="shop-card-top">
                    <span className="shop-card-name">{shop.nome}</span>
                  </div>
                  {shop.cnpj && <span className="shop-card-address">CNPJ: {shop.cnpj}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
