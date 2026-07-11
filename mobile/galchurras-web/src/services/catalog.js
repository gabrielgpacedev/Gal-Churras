// Serviço de catálogo — consome os endpoints públicos da API GalChurras.
import { API_URL } from './api';

function authHeaders() {
  try {
    const raw = localStorage.getItem('galchurras-auth');
    const token = raw ? JSON.parse(raw)?.token : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

async function getJson(path) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, { headers: { ...authHeaders() } });
  } catch {
    throw new Error('Não foi possível conectar ao servidor. Verifique se a API está no ar.');
  }
  if (!res.ok) {
    throw new Error('Falha ao carregar dados do catálogo.');
  }
  return res.json();
}

export const listarEstabelecimentos = () => getJson('/estabelecimentos');

export const listarCategoriasKit = () => getJson('/categorias-kit');

export const listarKits = (categoriaId) =>
  getJson(categoriaId ? `/kits?categoriaId=${categoriaId}` : '/kits');

export const listarProdutosDoKit = (kitId) => getJson(`/kits/${kitId}/produtos`);

export const listarProdutos = (estabelecimentoId) =>
  getJson(estabelecimentoId ? `/produtos?estabelecimentoId=${estabelecimentoId}` : '/produtos');
