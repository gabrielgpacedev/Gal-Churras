import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, homePathForRole } from '../context/AuthContext';
import { registerRequest } from '../services/api';

// Glue de rede compartilhado pelos formulários de cadastro:
// envia o payload, faz auto-login e redireciona para o painel do perfil.
export function useRegister() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (payload) => {
    setError('');
    setLoading(true);
    try {
      const data = await registerRequest(payload);
      login(data);
      navigate(homePathForRole(data.tipoUsuario), { replace: true });
    } catch (err) {
      setError(err.message || 'Não foi possível concluir o cadastro.');
    } finally {
      setLoading(false);
    }
  };

  return { submit, error, setError, loading };
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
