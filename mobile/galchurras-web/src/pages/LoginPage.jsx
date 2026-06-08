import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const fillDemo = () => {
    setUsername('Teste');
    setPassword('123');
  };

  return (
    <div className="screen login-screen">
      <div className="login-hero">
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
        <h1 className="login-title">
          Bem-vindo <em>de volta</em>
        </h1>
        <p className="login-subtitle">Entre para pedir os melhores kits da sua região</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="field-group">
            <label className="field-label">USUÁRIO</label>
            <div className="field-input">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                type="text"
                placeholder="Teste"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">SENHA</label>
            <div className="field-input">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="button" className="forgot-link">Esqueci minha senha</button>
          </div>

          <button type="submit" className="btn-primary login-btn">
            Entrar <span>→</span>
          </button>
        </form>

        <div className="login-divider">
          <span>OU CONTINUE COM</span>
        </div>

        <div className="social-buttons">
          <button className="social-btn">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google
          </button>
          <button className="social-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            Apple
          </button>
        </div>

        <p className="demo-hint">
          Acesso de demonstração:{' '}
          <button type="button" className="demo-btn" onClick={fillDemo}>
            <strong>Teste</strong>
          </button>{' '}
          /{' '}
          <button type="button" className="demo-btn" onClick={fillDemo}>
            <strong>123</strong>
          </button>
        </p>

        <p className="terms-text">
          Ao continuar, você aceita nossos <a href="#">Termos</a> e{' '}
          <a href="#">Política de Privacidade</a>.
        </p>
      </div>
    </div>
  );
}
