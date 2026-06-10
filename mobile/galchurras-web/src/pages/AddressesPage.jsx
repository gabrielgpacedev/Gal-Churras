import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addresses as initialAddresses } from '../data/mockData';

const STANDARD_LABELS = ['Casa', 'Trabalho'];
const LABEL_OPTIONS = ['Casa', 'Trabalho', 'Outro'];

function AddressForm({ address, onSave, onCancel }) {
  const getInitialLabel = () => {
    if (!address) return 'Casa';
    return STANDARD_LABELS.includes(address.label) ? address.label : 'Outro';
  };

  const [label, setLabel] = useState(getInitialLabel);
  const [customLabel, setCustomLabel] = useState(
    address && !STANDARD_LABELS.includes(address.label) ? address.label : ''
  );
  const [street, setStreet] = useState(address?.street || '');
  const [complement, setComplement] = useState(address?.complement || '');
  const [isDefault, setIsDefault] = useState(address?.default || false);

  const isCustom = label === 'Outro';
  const canSave = street.trim() && (!isCustom || customLabel.trim());

  const handleSave = () => {
    if (!canSave) return;
    const finalLabel = isCustom ? customLabel.trim() : label;
    onSave({ label: finalLabel, street: street.trim(), complement: complement.trim(), default: isDefault });
  };

  return (
    <div className="addr-overlay" onClick={onCancel}>
      <div className="addr-sheet" onClick={e => e.stopPropagation()}>
        <div className="addr-sheet-handle" />
        <h3 className="addr-sheet-title">{address ? 'Editar endereço' : 'Novo endereço'}</h3>

        <div className="addr-form">
          <div className="addr-form-group">
            <span className="field-label">TIPO</span>
            <div className="addr-label-pills">
              {LABEL_OPTIONS.map(opt => (
                <button
                  key={opt}
                  className={`addr-label-pill${label === opt ? ' active' : ''}`}
                  onClick={() => setLabel(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
            {isCustom && (
              <div className="field-input addr-custom-input">
                <input
                  placeholder="Ex: Academia, Namorada..."
                  value={customLabel}
                  onChange={e => setCustomLabel(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="addr-form-group">
            <span className="field-label">RUA E NÚMERO</span>
            <div className="field-input">
              <input
                placeholder="Ex: Rua das Flores, 48"
                value={street}
                onChange={e => setStreet(e.target.value)}
              />
            </div>
          </div>

          <div className="addr-form-group">
            <span className="field-label">COMPLEMENTO</span>
            <div className="field-input">
              <input
                placeholder="Apto, bloco, referência..."
                value={complement}
                onChange={e => setComplement(e.target.value)}
              />
            </div>
          </div>

          <button className="addr-default-toggle" onClick={() => setIsDefault(v => !v)}>
            <div className={`addr-toggle${isDefault ? ' on' : ''}`}>
              <div className="addr-toggle-knob" />
            </div>
            <span>Definir como endereço padrão</span>
          </button>
        </div>

        <div className="addr-sheet-actions">
          <button className="addr-cancel-btn" onClick={onCancel}>Cancelar</button>
          <button
            className={`btn-primary addr-save-btn${!canSave ? ' disabled' : ''}`}
            onClick={handleSave}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirm({ onConfirm, onCancel }) {
  return (
    <div className="addr-overlay" onClick={onCancel}>
      <div className="addr-sheet addr-confirm-sheet" onClick={e => e.stopPropagation()}>
        <div className="addr-sheet-handle" />
        <div className="addr-confirm-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
          </svg>
        </div>
        <h3 className="addr-sheet-title">Remover endereço?</h3>
        <p className="addr-confirm-text">Essa ação não pode ser desfeita.</p>
        <div className="addr-sheet-actions">
          <button className="addr-cancel-btn" onClick={onCancel}>Cancelar</button>
          <button className="addr-delete-confirm-btn" onClick={onConfirm}>Remover</button>
        </div>
      </div>
    </div>
  );
}

export default function AddressesPage() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState(initialAddresses);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const handleSave = (data) => {
    if (editingAddress === 'new') {
      const newAddr = { ...data, id: Date.now() };
      setAddresses(prev =>
        data.default
          ? [...prev.map(a => ({ ...a, default: false })), newAddr]
          : [...prev, newAddr]
      );
    } else {
      setAddresses(prev =>
        data.default
          ? prev.map(a => a.id === editingAddress.id ? { ...a, ...data } : { ...a, default: false })
          : prev.map(a => a.id === editingAddress.id ? { ...a, ...data } : a)
      );
    }
    setEditingAddress(null);
  };

  const handleDelete = () => {
    setAddresses(prev => prev.filter(a => a.id !== deleteId));
    setDeleteId(null);
  };

  const handleSetDefault = (id) => {
    setAddresses(prev => prev.map(a => ({ ...a, default: a.id === id })));
  };

  return (
    <div className="screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate('/account')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="page-title">Endereços</h1>
      </div>

      <div className="addr-list">
        {addresses.length === 0 && (
          <div className="addr-empty">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p>Nenhum endereço cadastrado</p>
          </div>
        )}

        {addresses.map(addr => (
          <div key={addr.id} className="addr-card">
            <div className="addr-card-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>

            <div className="addr-card-body">
              <div className="addr-card-top">
                <span className="addr-card-label">{addr.label}</span>
                {addr.default && <span className="addr-default-badge">PADRÃO</span>}
              </div>
              <span className="addr-card-street">{addr.street}</span>
              {addr.complement && <span className="addr-card-complement">{addr.complement}</span>}
              {!addr.default && (
                <button className="addr-set-default-btn" onClick={() => handleSetDefault(addr.id)}>
                  Definir como padrão
                </button>
              )}
            </div>

            <div className="addr-card-actions">
              <button className="addr-action-btn" onClick={() => setEditingAddress(addr)} aria-label="Editar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
              <button className="addr-action-btn addr-delete-btn" onClick={() => setDeleteId(addr.id)} aria-label="Remover">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                </svg>
              </button>
            </div>
          </div>
        ))}

        <button className="addr-add-btn" onClick={() => setEditingAddress('new')}>
          <div className="addr-add-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          Adicionar endereço
        </button>
      </div>

      {editingAddress !== null && (
        <AddressForm
          address={editingAddress === 'new' ? null : editingAddress}
          onSave={handleSave}
          onCancel={() => setEditingAddress(null)}
        />
      )}

      {deleteId !== null && (
        <DeleteConfirm
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
