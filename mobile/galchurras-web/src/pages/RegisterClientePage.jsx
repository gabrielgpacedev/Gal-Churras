import { useState } from 'react';
import RegisterLayout from '../components/RegisterLayout';
import { useRegister, EMAIL_REGEX } from '../hooks/useRegister';
import { ROLES } from '../context/AuthContext';
import { formatCPF, isValidCPF } from '../utils/cpf';

const GENEROS = ['Feminino', 'Masculino', 'Outro', 'Prefiro não informar'];

// Formulário individual — Cliente.
export default function RegisterClientePage() {
  const { submit, error, setError, loading } = useRegister();
  const [f, setF] = useState({
    nome: '', documento: '', dataNascimento: '', genero: '',
    email: '', telefone: '', senha: '', confirmar: '',
  });

  const set = (k) => (e) => {
    setF((p) => ({ ...p, [k]: e.target.value }));
    if (error) setError('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    if (!f.nome.trim()) return setError('Informe seu nome.');
    if (!f.documento.trim()) return setError('Informe seu CPF.');
    if (!isValidCPF(f.documento)) return setError('CPF inválido.');
    if (!EMAIL_REGEX.test(f.email.trim())) return setError('Digite um e-mail válido.');
    if (f.senha.length < 4) return setError('A senha deve ter ao menos 4 caracteres.');
    if (f.senha !== f.confirmar) return setError('As senhas não coincidem.');

    submit({
      nome: f.nome.trim(),
      email: f.email.trim(),
      documento: f.documento.trim(),
      genero: f.genero,
      dataNascimento: f.dataNascimento,
      senha: f.senha,
      tipoUsuario: ROLES.CLIENTE,
    });
  };

  return (
    <RegisterLayout
      title={<>Cadastro de <em>cliente</em></>}
      subtitle="Crie sua conta para pedir kits de churrasco."
    >
      <form onSubmit={onSubmit} className="login-form">
        <div className="field-group">
          <label className="field-label">NOME COMPLETO</label>
          <input className="reg-input" type="text" placeholder="Seu nome" value={f.nome} onChange={set('nome')} />
        </div>

        <div className="field-group">
          <label className="field-label">CPF</label>
          <input
            className="reg-input"
            type="text"
            inputMode="numeric"
            maxLength={14}
            placeholder="000.000.000-00"
            value={f.documento}
            onChange={(e) => {
              setF((p) => ({ ...p, documento: formatCPF(e.target.value) }));
              if (error) setError('');
            }}
          />
        </div>

        <div className="reg-row">
          <div className="field-group">
            <label className="field-label">NASCIMENTO</label>
            <input className="reg-input" type="date" value={f.dataNascimento} onChange={set('dataNascimento')} />
          </div>
          <div className="field-group">
            <label className="field-label">GÊNERO</label>
            <select className="reg-input" value={f.genero} onChange={set('genero')}>
              <option value="">Selecione</option>
              {GENEROS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        <div className="reg-row">
          <div className="field-group">
            <label className="field-label">E-MAIL</label>
            <input className="reg-input" type="text" inputMode="email" autoComplete="email" placeholder="voce@email.com" value={f.email} onChange={set('email')} />
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
