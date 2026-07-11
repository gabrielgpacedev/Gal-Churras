import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { listarEstabelecimentos, listarKits, listarProdutos } from '../services/catalog';

const money = (v) => {
  if (v == null || v === '') return '';
  const n = typeof v === 'number' ? v : Number(String(v).replace(/[^0-9.,]/g, '').replace(',', '.'));
  if (Number.isNaN(n)) return String(v);
  return `R$ ${n.toFixed(2).replace('.', ',')}`;
};

export default function CatalogoPage() {
  const navigate = useNavigate();
  const [kits, setKits] = useState([]);
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProdutos, setLoadingProdutos] = useState(false);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  // Carrega kits + estabelecimentos
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    Promise.all([listarKits(), listarEstabelecimentos()])
      .then(([k, s]) => {
        if (!active) return;
        setKits(k);
        setShops(s);
        setSelectedShop(s.length ? s[0] : null);
      })
      .catch((e) => active && setError(e.message || 'Erro ao carregar o catálogo.'))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [reloadKey]);

  // Carrega produtos do estabelecimento selecionado
  useEffect(() => {
    if (!selectedShop) {
      setProdutos([]);
      return;
    }
    let active = true;
    setLoadingProdutos(true);
    listarProdutos(selectedShop.id)
      .then((p) => active && setProdutos(p))
      .catch(() => active && setProdutos([]))
      .finally(() => active && setLoadingProdutos(false));
    return () => {
      active = false;
    };
  }, [selectedShop]);

  return (
    <div className="screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate('/')} aria-label="Voltar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="page-title">Catálogo</h1>
      </div>

      {loading && <div className="catalog-state">Carregando catálogo…</div>}

      {error && !loading && (
        <div className="catalog-state catalog-error">
          <p>{error}</p>
          <button className="btn-primary catalog-retry" onClick={() => setReloadKey((k) => k + 1)}>
            Tentar novamente
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="catalog-body">
          {/* Açougues */}
          <section>
            <h2 className="section-title">Açougues</h2>
            {shops.length === 0 ? (
              <p className="catalog-empty">Nenhum estabelecimento cadastrado.</p>
            ) : (
              <div className="category-pills">
                {shops.map((s) => (
                  <button
                    key={s.id}
                    className={`category-pill${selectedShop?.id === s.id ? ' active' : ''}`}
                    onClick={() => setSelectedShop(s)}
                  >
                    {s.nome}
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Produtos do açougue selecionado */}
          {selectedShop && (
            <section>
              <div className="section-header">
                <h2 className="section-title">Produtos de {selectedShop.nome}</h2>
              </div>
              {loadingProdutos ? (
                <div className="catalog-state">Carregando produtos…</div>
              ) : produtos.length === 0 ? (
                <p className="catalog-empty">Este açougue ainda não tem produtos.</p>
              ) : (
                <div className="catalog-list">
                  {produtos.map((p, i) => (
                    <div key={i} className="catalog-card">
                      <div className="catalog-card-body">
                        {p.categoriaProduto && <span className="catalog-card-tag">{p.categoriaProduto}</span>}
                        <strong className="catalog-card-name">{p.nome}</strong>
                        {p.descricao && <span className="catalog-card-desc">{p.descricao}</span>}
                      </div>
                      <span className="catalog-card-price">{money(p.valor)}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Kits */}
          <section>
            <h2 className="section-title">Kits</h2>
            {kits.length === 0 ? (
              <p className="catalog-empty">Nenhum kit disponível.</p>
            ) : (
              <div className="catalog-list">
                {kits.map((k) => (
                  <div key={k.id} className="catalog-card">
                    <div className="catalog-card-body">
                      <span className="catalog-card-tag gold">KIT</span>
                      <strong className="catalog-card-name">{k.nome}</strong>
                    </div>
                    <span className="catalog-card-price">{money(k.valor)}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
