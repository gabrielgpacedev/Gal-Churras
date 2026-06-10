import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { currentUser } from '../data/mockData';

const GENDER_OPTIONS = [
  { id: 'M', label: 'Masculino' },
  { id: 'F', label: 'Feminino' },
  { id: 'NB', label: 'Não-binário' },
  { id: 'NA', label: 'Prefiro não informar' },
];

const formatCPF = (val) => {
  const d = val.replace(/\D/g, '').slice(0, 11);
  return d
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

const formatPhone = (val) => {
  const d = val.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/\($/, '').replace(/-$/, '');
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
};

function FormField({ label, children, hint }) {
  return (
    <div className="edit-field-group">
      <span className="field-label">{label}</span>
      {children}
      {hint && <span className="edit-field-hint">{hint}</span>}
    </div>
  );
}

export default function EditProfilePage() {
  const navigate = useNavigate();

  const [name,   setName]   = useState(currentUser.name);
  const [email,  setEmail]  = useState(currentUser.email);
  const [phone,  setPhone]  = useState(currentUser.phone);
  const [cpf,    setCpf]    = useState(currentUser.cpf);
  const [rg,     setRg]     = useState(currentUser.rg);
  const [gender, setGender] = useState(currentUser.gender);

  const [saved, setSaved] = useState(false);

  const avatarLetter = name.trim() ? name.trim()[0].toUpperCase() : '?';

  const handleSave = () => {
    currentUser.name   = name.trim() || currentUser.name;
    currentUser.email  = email.trim() || currentUser.email;
    currentUser.phone  = phone;
    currentUser.cpf    = cpf;
    currentUser.rg     = rg;
    currentUser.gender = gender;
    currentUser.avatar = avatarLetter;
    setSaved(true);
    setTimeout(() => navigate('/account'), 1000);
  };

  const canSave = name.trim() && email.trim();

  return (
    <div className="screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate('/account')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="page-title">Editar perfil</h1>
      </div>

      <div className="edit-profile-body">

        {/* Avatar */}
        <div className="edit-avatar-section">
          <div className="edit-avatar">
            {avatarLetter}
            <div className="edit-avatar-badge">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
          </div>
          <span className="edit-avatar-hint">Foto de perfil</span>
        </div>

        {/* Seção: Dados pessoais */}
        <div className="edit-section">
          <p className="edit-section-label">DADOS PESSOAIS</p>

          <FormField label="NOME COMPLETO">
            <div className="field-input">
              <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
          </FormField>

          <FormField label="E-MAIL">
            <div className="field-input">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </FormField>

          <FormField label="TELEFONE">
            <div className="field-input">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <input
                type="tel"
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={e => setPhone(formatPhone(e.target.value))}
              />
            </div>
          </FormField>
        </div>

        {/* Seção: Documentos */}
        <div className="edit-section">
          <p className="edit-section-label">DOCUMENTOS</p>

          <FormField label="CPF" hint="Apenas para verificação de identidade">
            <div className="field-input">
              <input
                type="text"
                inputMode="numeric"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={e => setCpf(formatCPF(e.target.value))}
              />
            </div>
          </FormField>

          <FormField label="RG">
            <div className="field-input">
              <input
                type="text"
                placeholder="00.000.000-0"
                value={rg}
                onChange={e => setRg(e.target.value)}
              />
            </div>
          </FormField>
        </div>

        {/* Seção: Identidade */}
        <div className="edit-section">
          <p className="edit-section-label">IDENTIDADE</p>

          <FormField label="GÊNERO">
            <div className="edit-select-wrapper">
              <select
                className="edit-select"
                value={gender}
                onChange={e => setGender(e.target.value)}
              >
                <option value="">Selecionar...</option>
                {GENDER_OPTIONS.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </select>
              <svg className="edit-select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </FormField>
        </div>

        {/* Botão salvar */}
        <div className="edit-save-container">
          <button
            className={`btn-primary edit-save-btn${!canSave ? ' disabled' : ''}${saved ? ' saved' : ''}`}
            onClick={handleSave}
            disabled={!canSave || saved}
          >
            {saved ? (
              <>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Salvo!
              </>
            ) : 'Salvar alterações'}
          </button>
        </div>
      </div>
    </div>
  );
}
