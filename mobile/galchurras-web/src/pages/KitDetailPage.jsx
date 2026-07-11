import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { listarKits, listarProdutosDoKit, listarEstabelecimentos } from '../services/catalog';

const money = (v) => {
  if (v == null || v === '') return '';
  const n = typeof v === 'number' ? v : Number(String(v).replace(/[^0-9.,]/g, '').replace(',', '.'));
  if (Number.isNaN(n)) return String(v);
  return `R$ ${n.toFixed(2).replace('.', ',')}`;
};

// A API não fornece imagem do kit; mostramos o aviso no lugar dela.
function MediaFallback() {
  return <div className="media-fallback">Não foi possível encontrar a imagem</div>;
}

export default function KitDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [kit, setKit] = useState(null);            // { nome, valor, categoria }
  const [produtos, setProdutos] = useState([]);    // itens que compõem o kit (INCLUI)
  const [shops, setShops] = useState([]);          // açougues que oferecem o kit
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');

    Promise.all([listarKits(), listarProdutosDoKit(id), listarEstabelecimentos()])
      .then(([todos, prods, estabs]) => {
        if (!active) return;
        const atual = todos.find((k) => String(k.id) === String(id));
        setKit(
          atual || {
            nome: location.state?.nome || 'Kit',
            valor: null,
            categoria: location.state?.categoria || '',
          }
        );
        setProdutos(prods);
        setShops(estabs);
      })
      .catch((e) => active && setError(e.message || 'Erro ao carregar o kit.'))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [id, location.state?.nome, location.state?.categoria]);

  const nome = kit?.nome || location.state?.nome || 'Kit';
  const categoria = kit?.categoria || location.state?.categoria || '';
  const valor = kit?.valor;
  const totalOpcoes = shops.length;

  return (
    <div className="screen">
      <div className="detail-hero">
        <div className="detail-hero-image" />
        <MediaFallback />
        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Voltar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="detail-hero-overlay">
          {categoria && <span className="detail-hero-tag">{categoria}</span>}
          <h1 className="detail-hero-title">{nome}</h1>
        </div>
      </div>

      <div className="detail-content">
        {loading && <div className="catalog-state">Carregando…</div>}

        {error && !loading && (
          <div className="catalog-state catalog-error">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="section-header">
              <h2 className="section-title">Açougues com esse kit</h2>
              <span className="offers-count">
                {totalOpcoes} {totalOpcoes === 1 ? 'opção' : 'opções'}
              </span>
            </div>

            {shops.length === 0 ? (
              <p className="catalog-empty">Nenhum açougue oferece esse kit no momento.</p>
            ) : (
              <div className="offers-list">
                {shops.map((shop) => (
                  <div
                    key={shop.id}
                    className="offer-card"
                    onClick={() => navigate(`/butcher/${shop.id}`)}
                  >
                    <div className="offer-card-header">
                      <div>
                        <span className="offer-shop-name">{shop.nome}</span>
                        {shop.cnpj && (
                          <span className="offer-shop-address">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            CNPJ: {shop.cnpj}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="offer-items">
                      <span className="offer-items-label">INCLUI</span>
                      {produtos.length === 0 ? (
                        <div className="offer-item-row">
                          <span>Itens não cadastrados</span>
                        </div>
                      ) : (
                        produtos.map((p, i) => (
                          <div key={i} className="offer-item-row">
                            <span>{p.nome}</span>
                            {p.quantidade != null && <span>{p.quantidade}x</span>}
                          </div>
                        ))
                      )}
                    </div>

                    <div className="offer-footer">
                      <div className="offer-meta" />
                      {money(valor) && <span className="offer-price">{money(valor)}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
