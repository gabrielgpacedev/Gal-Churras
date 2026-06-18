import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = email.trim();

    if (!EMAIL_REGEX.test(value)) {
      setError('Digite um e-mail válido.');
      return;
    }

    setError('');
    // Envio do e-mail ainda não integrado — apenas simula o fluxo.
    setSent(true);
  };

  return (
    <div className="screen login-screen">
      <button className="back-btn" onClick={() => navigate('/login')} aria-label="Voltar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

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
        {!sent ? (
          <>
            <h1 className="login-title">
              Recuperar <em>senha</em>
            </h1>
            <p className="login-subtitle">
              Informe o e-mail da sua conta. Enviaremos um link com as instruções para criar uma nova senha.
            </p>

            <form onSubmit={handleSubmit} className="login-form">
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
                    autoComplete="email"
                    placeholder="voce@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                  />
                </div>
              </div>

              {error && <p className="login-error">{error}</p>}

              <button type="submit" className="btn-primary login-btn">
                Enviar link de recuperação <span>→</span>
              </button>
            </form>

            <button type="button" className="back-to-login" onClick={() => navigate('/login')}>
              Voltar para o login
            </button>
          </>
        ) : (
          <div className="forgot-success">
            <div className="forgot-success-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
            </div>
            <h1 className="login-title">E-mail <em>enviado</em></h1>
            <p className="login-subtitle">
              Enviamos as instruções para alterar a sua senha para{' '}
              <strong className="forgot-email">{email.trim()}</strong>. Verifique a sua caixa de entrada
              e a pasta de spam.
            </p>

            <button type="button" className="btn-primary login-btn" onClick={() => navigate('/login')}>
              Voltar para o login
            </button>

            <p className="demo-hint">
              Não recebeu?{' '}
              <button type="button" className="demo-btn" onClick={() => setSent(false)}>
                <strong>Reenviar</strong>
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
