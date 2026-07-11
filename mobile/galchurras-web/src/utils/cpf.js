// Utilitários de CPF: máscara e validação de dígitos verificadores.

/** Formata progressivamente para 000.000.000-00 conforme o usuário digita. */
export function formatCPF(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

/** Valida um CPF (aceita com ou sem máscara) pelos dígitos verificadores. */
export function isValidCPF(value) {
  const cpf = String(value).replace(/\D/g, '');
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false; // todos os dígitos iguais

  const digit = (factor) => {
    let sum = 0;
    for (let i = 0; i < factor - 1; i++) {
      sum += parseInt(cpf[i], 10) * (factor - i);
    }
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  return digit(10) === parseInt(cpf[9], 10) && digit(11) === parseInt(cpf[10], 10);
}
