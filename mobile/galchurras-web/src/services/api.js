// Cliente HTTP da API GalChurras.
// A URL base pode ser configurada via VITE_API_URL (arquivo .env); por padrão
// aponta para o backend Spring Boot rodando localmente na porta 8080.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

/**
 * Autentica o usuário no backend por e-mail ou CPF + senha.
 * @param {string} identificador  e-mail ou CPF
 * @param {string} senha
 * @returns {Promise<{token:string,id:number,nome:string,email:string,tipoUsuario:string}>}
 */
export async function loginRequest(identificador, senha) {
  let res;
  try {
    res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identificador, senha }),
    });
  } catch {
    // Falha de rede / backend fora do ar
    throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão.');
  }

  if (!res.ok) {
    let message = 'Usuário ou senha inválidos.';
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch {
      /* resposta sem corpo JSON */
    }
    throw new Error(message);
  }

  return res.json();
}

/**
 * Cadastra um novo usuário (cliente, entregador ou estabelecimento).
 * @param {object} payload { nome, email, documento, genero, dataNascimento, login, senha, tipoUsuario }
 * @returns {Promise<{token:string,id:number,nome:string,email:string,tipoUsuario:string}>}
 */
export async function registerRequest(payload) {
  let res;
  try {
    res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão.');
  }

  if (!res.ok) {
    let message = 'Não foi possível concluir o cadastro.';
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch {
      /* resposta sem corpo JSON */
    }
    throw new Error(message);
  }

  return res.json();
}
