import { useNavigate } from 'react-router-dom';
import RegisterLayout from '../components/RegisterLayout';

// Tela "Criar conta": escolha do sistema. Cada opção leva ao formulário individual.
const OPTIONS = [
  { path: '/register/cliente', emoji: '🛒', label: 'Cliente', desc: 'Peça kits de churrasco em casa' },
  { path: '/register/entregador', emoji: '🛵', label: 'Entregador', desc: 'Faça entregas e receba por elas' },
  { path: '/register/estabelecimento', emoji: '🏪', label: 'Estabelecimento', desc: 'Venda os kits do seu açougue' },
];

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <RegisterLayout
      title={<>Criar <em>conta</em></>}
      subtitle="Escolha o tipo de conta que você quer criar."
    >
      <div className="register-choice-list">
        {OPTIONS.map((o) => (
          <button
            key={o.path}
            type="button"
            className="register-choice-card"
            onClick={() => navigate(o.path)}
          >
            <span className="register-choice-emoji">{o.emoji}</span>
            <span className="register-choice-text">
              <strong>{o.label}</strong>
              <span>{o.desc}</span>
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        ))}
      </div>
    </RegisterLayout>
  );
}
