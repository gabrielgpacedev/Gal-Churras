import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Credenciais de demonstração (sem backend ainda)
const DEMO_USER = '123';
const DEMO_PASS = '123';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (email.trim() === DEMO_USER && password === DEMO_PASS) {
      setError('');
      login({ name: 'Cliente', email: email.trim() });
      navigate('/');
      return;
    }

    setError('Usuário ou senha inválidos. Tente novamente.');
  };

  const handleForgot = () => {
    navigate('/forgot-password');
  };

  const handleGoogle = () => {
    // Login social ainda não integrado — segue como demonstração.
    setError('');
    login({ name: 'Cliente Google', provider: 'google' });
    navigate('/');
  };

  const fillDemo = () => {
    setError('');
    setEmail(DEMO_USER);
    setPassword(DEMO_PASS);
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
          Bem-vindo
        </h1>
    
        <form onSubmit={handleLogin} className="login-form">
          <div className="field-group">
            <label className="field-label">E-MAIL</label>
            <div className="field-input">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              <input
                type="text"
                inputMode="email"
                autoComplete="username"
                placeholder="voce@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
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
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
              />
            </div>
            <button type="button" className="forgot-link" onClick={handleForgot}>
              Esqueci minha senha
            </button>
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="btn-primary login-btn">
            Entrar <span>→</span>
          </button>
        </form>

        <div className="login-divider">
          <span>OU CONTINUE COM</span>
        </div>

        <div className="social-buttons">
          <button className="social-btn" onClick={handleGoogle}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continuar com Google
          </button>
        </div>

        <p className="demo-hint">
          Acesso de demonstração:{' '}
          <button type="button" className="demo-btn" onClick={fillDemo}>
            <strong>123</strong>
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
