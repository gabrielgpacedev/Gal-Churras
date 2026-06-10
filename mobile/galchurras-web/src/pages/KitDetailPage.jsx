import { useNavigate, useParams } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { kits, kitShopOffers, butcherShops, shopKits } from '../data/mockData';
import { useCart } from '../context/CartContext';

export default function KitDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addKit } = useCart();
  const kit = kits.find((k) => k.id === Number(id));
  const offers = kitShopOffers[Number(id)] || [];

  const orderFrom = (shopId) => {
    const shopKit = (shopKits[shopId] || []).find((sk) => sk.kitId === Number(id));
    if (shopKit && addKit(shopKit)) navigate('/checkout');
  };

  if (!kit) return <div className="screen"><p style={{ color: '#f5e6c8', padding: '2rem' }}>Kit não encontrado.</p></div>;

  return (
    <div className="screen">
      <div className="detail-hero">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <div className="detail-hero-image" style={kit.image ? { backgroundImage: `url(${kit.image})` } : undefined} />
        <div className="detail-hero-overlay">
          <span className="detail-hero-tag">{kit.badge}</span>
          <h1 className="detail-hero-title">{kit.name}</h1>
          <div className="detail-hero-serves">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87" />
              <path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
            {kit.serves}
          </div>
        </div>
      </div>

      <div className="detail-content">
        <p className="detail-description">{kit.description}</p>

        <div className="section-header">
          <h3 className="section-title">Açougues com esse kit</h3>
          <span className="offers-count">{offers.length} opções</span>
        </div>

        <div className="offers-list">
          {offers.map((offer) => {
            const shop = butcherShops.find((s) => s.id === offer.shopId);
            if (!shop) return null;
            return (
              <div
                key={offer.shopId}
                className="offer-card"
                onClick={() => orderFrom(shop.id)}
              >
                <div className="offer-card-header">
                  <div>
                    <span className="offer-shop-name">{shop.name}</span>
                    <div className="offer-shop-address">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {shop.address}
                    </div>
                  </div>
                  <span className="offer-shop-rating">⭐ {shop.rating}</span>
                </div>

                <div className="offer-items">
                  <span className="offer-items-label">INCLUI</span>
                  {offer.items.map((item) => (
                    <div key={item.name} className="offer-item-row">
                      <span>{item.name}</span>
                      <span>{item.qty}</span>
                    </div>
                  ))}
                </div>

                <div className="offer-footer">
                  <div className="offer-meta">
                    <span>🕐 {offer.deliveryTime}</span>
                    <span>📍 {offer.distance}</span>
                  </div>
                  <span className="offer-price">R$ {offer.price.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
