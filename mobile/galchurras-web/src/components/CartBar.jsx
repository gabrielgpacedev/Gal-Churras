import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const HIDDEN_ON = ['/checkout', '/login', '/forgot-password'];

export default function CartBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { count, subtotal } = useCart();

  if (count === 0 || HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <button className="cart-bar" onClick={() => navigate('/checkout')}>
      <span className="cart-bar-count">{count}</span>
      <span className="cart-bar-label">Ver carrinho</span>
      <span className="cart-bar-total">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
    </button>
  );
}
