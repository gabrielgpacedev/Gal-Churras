import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, ROLES, homePathForRole } from '../context/AuthContext';
import { loginRequest } from '../services/api';

// Acessos de demonstração (funcionam sem backend, para testar cada perfil).
const DEMO_ACCOUNTS = {
  [ROLES.CLIENTE]: { nome: 'Cliente', email: 'cliente@galchurras.com' },
  [ROLES.ENTREGADOR]: { nome: 'Entregador', email: 'entregador@galchurras.com' },
  [ROLES.ESTABELECIMENTO]: { nome: 'Boi Nobre', email: 'contato@boinobre.com' },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError('');
    setLoading(true);
    try {
      const data = await loginRequest(email.trim(), password);
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

  // Entrada de demonstração: injeta um usuário local do perfil escolhido.
  const enterAsDemo = (role) => {
    setError('');
    const account = DEMO_ACCOUNTS[role];
    login({ ...account, tipoUsuario: role, demo: true });
    navigate(homePathForRole(role), { replace: true });
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
        <div className="auth-toggle">
          <button type="button" className="auth-toggle-btn active">
            Já tenho conta
          </button>
          <button
            type="button"
            className="auth-toggle-btn"
            onClick={() => navigate('/register')}
          >
            Criar conta
          </button>
        </div>

        <h1 className="login-title">
          Bem-vindo
        </h1>

        <form onSubmit={handleLogin} className="login-form">
          <div className="field-group">
            <label className="field-label">LOGIN</label>
            <div className="field-input">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              <input
                type="text"
                autoComplete="username"
                placeholder="seu login ou e-mail"
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

          <button type="submit" className="btn-primary login-btn" disabled={loading}>
            {loading ? 'Entrando…' : <>Entrar <span>→</span></>}
          </button>
        </form>

        <div className="login-divider">
          <span>ACESSO DE DEMONSTRAÇÃO</span>
        </div>

        <div className="demo-roles">
          <button type="button" className="demo-role-btn" onClick={() => enterAsDemo(ROLES.CLIENTE)}>
            <span className="demo-role-emoji">🛒</span>
            Cliente
          </button>
          <button type="button" className="demo-role-btn" onClick={() => enterAsDemo(ROLES.ENTREGADOR)}>
            <span className="demo-role-emoji">🛵</span>
            Entregador
          </button>
          <button type="button" className="demo-role-btn" onClick={() => enterAsDemo(ROLES.ESTABELECIMENTO)}>
            <span className="demo-role-emoji">🏪</span>
            Estabelecimento
          </button>
        </div>

        <p className="terms-text">
          Ao continuar, você aceita nossos <a href="#">Termos</a> e{' '}
          <a href="#">Política de Privacidade</a>.
        </p>
      </div>
    </div>
  );
}
