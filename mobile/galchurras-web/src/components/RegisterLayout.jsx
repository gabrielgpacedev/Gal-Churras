import { useNavigate } from 'react-router-dom';

// Moldura visual comum das telas de cadastro (logo + alternador + container).
// Os formulários de cada sistema entram como children.
export default function RegisterLayout({ title, subtitle, children }) {
  const navigate = useNavigate();

  return (
    <div className="screen login-screen">
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
        <div className="auth-toggle">
          <button type="button" className="auth-toggle-btn" onClick={() => navigate('/login')}>
            Já tenho conta
          </button>
          <button type="button" className="auth-toggle-btn active" onClick={() => navigate('/register')}>
            Criar conta
          </button>
        </div>

        <h1 className="login-title">{title}</h1>
        {subtitle && <p className="login-subtitle">{subtitle}</p>}

        {children}
      </div>
    </div>
  );
}
