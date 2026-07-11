import { useNavigate } from 'react-router-dom';

// Moldura visual comum das telas de cadastro (logo + alternador + container).
// Os formulários de cada sistema entram como children.
export default function RegisterLayout({ title, subtitle, children }) {
  const navigate = useNavigate();

  return (
    <div className="screen login-screen">
      <button className="back-btn" onClick={() => navigate('/login')} aria-label="Voltar para o login">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div className="login-hero register-hero">
        <div className="login-logo">
          <div className="logo-box">
            <span className="logo-bbq">BBQ</span>
            <span className="logo-gal">GAL</span>
            <span className="logo-churras">CHURRAS</span>
          </div>
        </div>
        <div className="login-badge">
          <span className="flame-icon">🔥</span> BRASA PREMIUM
        </div>
      </div>

      <div className="login-form-container">
        <h1 className="login-title">{title}</h1>
        {subtitle && <p className="login-subtitle">{subtitle}</p>}

        {children}
      </div>
    </div>
  );
}
