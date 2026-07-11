import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, homePathForRole } from '../context/AuthContext';
import { loginRequest } from '../services/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [identificador, setIdentificador] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError('');
    setLoading(true);
    try {
      const data = await loginRequest(identificador.trim(), password);
      login(data);
      navigate(homePathForRole(data.tipoUsuario), { replace: true });
    } catch (err) {
      setError(err.message || 'Não foi possível entrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = () => {
    navigate('/forgot-password');
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
        <p className="login-subtitle">Entre na sua conta ou crie uma nova.</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="field-group">
            <label className="field-label">E-MAIL OU CPF</label>
            <div className="field-input">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              <input
                type="text"
                autoComplete="username"
                placeholder="seu e-mail ou CPF"
                value={identificador}
                onChange={(e) => {
                  setIdentificador(e.target.value);
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

          <button type="submit" className="btn-primary login-btn" disabled={loading}>
            {loading ? 'Entrando…' : <>Entrar <span>→</span></>}
          </button>
        </form>

        <button
          type="button"
          className="btn-secondary login-btn"
          onClick={() => navigate('/register/cliente')}
        >
          Criar conta
        </button>

        <p className="terms-text">
          Ao continuar, você aceita nossos <a href="#">Termos</a> e{' '}
          <a href="#">Política de Privacidade</a>.
        </p>
      </div>
    </div>
  );
}
