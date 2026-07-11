import { useState } from 'react';
import RegisterLayout from '../components/RegisterLayout';
import { useRegister, EMAIL_REGEX } from '../hooks/useRegister';
import { ROLES } from '../context/AuthContext';

// Formulário individual — Estabelecimento (açougue).
export default function RegisterEstabelecimentoPage() {
  const { submit, error, setError, loading } = useRegister();
  const [f, setF] = useState({
    nome: '', documento: '', responsavel: '',
    email: '', telefone: '', senha: '', confirmar: '',
  });

  const set = (k) => (e) => {
    setF((p) => ({ ...p, [k]: e.target.value }));
    if (error) setError('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    if (!f.nome.trim()) return setError('Informe o nome do estabelecimento.');
    if (!f.documento.trim()) return setError('Informe o CNPJ.');
    if (!EMAIL_REGEX.test(f.email.trim())) return setError('Digite um e-mail válido.');
    if (f.senha.length < 4) return setError('A senha deve ter ao menos 4 caracteres.');
    if (f.senha !== f.confirmar) return setError('As senhas não coincidem.');

    submit({
      nome: f.nome.trim(),
      email: f.email.trim(),
      documento: f.documento.trim(),
      genero: '',           // não se aplica a estabelecimento (backend usa padrão)
      dataNascimento: '',   // idem
      senha: f.senha,
      tipoUsuario: ROLES.ESTABELECIMENTO,
    });
  };

  return (
    <RegisterLayout
      title={<>Cadastro de <em>estabelecimento</em></>}
      subtitle="Cadastre seu açougue para vender kits de churrasco."
    >
      <form onSubmit={onSubmit} className="login-form">
        <div className="field-group">
          <label className="field-label">NOME DO ESTABELECIMENTO</label>
          <input className="reg-input" type="text" placeholder="Ex.: Boi Nobre Açougue" value={f.nome} onChange={set('nome')} />
        </div>

        <div className="field-group">
          <label className="field-label">CNPJ</label>
          <input className="reg-input" type="text" inputMode="numeric" placeholder="00.000.000/0000-00" value={f.documento} onChange={set('documento')} />
        </div>

        <div className="field-group">
          <label className="field-label">RESPONSÁVEL</label>
          <input className="reg-input" type="text" placeholder="Nome do responsável" value={f.responsavel} onChange={set('responsavel')} />
        </div>

        <div className="reg-row">
          <div className="field-group">
            <label className="field-label">E-MAIL</label>
            <input className="reg-input" type="text" inputMode="email" autoComplete="email" placeholder="contato@acougue.com" value={f.email} onChange={set('email')} />
          </div>
          <div className="field-group">
            <label className="field-label">TELEFONE</label>
            <input className="reg-input" type="text" inputMode="tel" placeholder="(00) 00000-0000" value={f.telefone} onChange={set('telefone')} />
          </div>
        </div>

        <div className="reg-row">
          <div className="field-group">
            <label className="field-label">SENHA</label>
            <input className="reg-input" type="password" autoComplete="new-password" placeholder="••••••••" value={f.senha} onChange={set('senha')} />
          </div>
          <div className="field-group">
            <label className="field-label">CONFIRMAR</label>
            <input className="reg-input" type="password" autoComplete="new-password" placeholder="••••••••" value={f.confirmar} onChange={set('confirmar')} />
          </div>
        </div>

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="btn-primary login-btn" disabled={loading}>
          {loading ? 'Criando conta…' : <>Criar conta <span>→</span></>}
        </button>
      </form>
    </RegisterLayout>
  );
}
