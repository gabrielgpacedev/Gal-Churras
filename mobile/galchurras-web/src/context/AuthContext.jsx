import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);
const STORAGE_KEY = 'galchurras-auth';

// Perfis de usuário reconhecidos pela API (enum TipoUsuario).
export const ROLES = {
  CLIENTE: 'CLIENTE',
  ENTREGADOR: 'ENTREGADOR',
  ESTABELECIMENTO: 'ESTABELECIMENTO',
};

// Rota inicial de cada perfil após o login.
export function homePathForRole(role) {
  switch (role) {
    case ROLES.ENTREGADOR:
      return '/entregador';
    case ROLES.ESTABELECIMENTO:
      return '/estabelecimento';
    case ROLES.CLIENTE:
    default:
      return '/';
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  // `data` vem da API: { token, id, nome, email, tipoUsuario }.
  // Se nada for passado, mantém compatibilidade com acesso de convidado.
  const login = (data) =>
    setUser(data ?? { nome: 'Convidado', tipoUsuario: ROLES.CLIENTE });

  const logout = () => setUser(null);

  const role = user?.tipoUsuario ?? null;

  return (
    <AuthContext.Provider
      value={{ user, role, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
