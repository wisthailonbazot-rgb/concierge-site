// Supabase foi substituído pela API VPS própria.
// Use lib/api.ts para todas as operações de dados.
// Este arquivo existe apenas para evitar erros de importação em arquivos que possam
// ainda referenciar createClient — mas nenhum arquivo deve mais usar isto.

export function createClient() {
  return null;
}

export function isSupabaseConfigured() {
  return false;
}
