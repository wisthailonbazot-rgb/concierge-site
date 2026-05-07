-- =============================================
-- CONCIERGE BRASIL — Setup do Banco Supabase
-- Execute este SQL no Supabase SQL Editor
-- =============================================

-- 1. Tabela de configurações gerais
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela de imagens da galeria
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  src TEXT NOT NULL,
  alt TEXT NOT NULL DEFAULT '',
  section TEXT NOT NULL DEFAULT 'gallery',
  display_order INT DEFAULT 0,
  active BOOL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabela de vagas
CREATE TABLE IF NOT EXISTS job_openings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  active BOOL DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Dados iniciais (configurações padrão)
-- =============================================
INSERT INTO site_settings (key, value) VALUES
  ('phone',     '(62) 9244-0750'),
  ('whatsapp',  '556292440750'),
  ('email',     'conciergeconservacao@gmail.com'),
  ('instagram', 'conciergeconservacao')
ON CONFLICT (key) DO NOTHING;

-- Vagas padrão
INSERT INTO job_openings (title, description, display_order) VALUES
  ('Porteiro 24h',      'Controle de acesso e segurança em condomínios', 1),
  ('Zelador(a)',         'Manutenção e conservação das áreas comuns',     2),
  ('Auxiliar de Limpeza','Limpeza e higienização de ambientes',           3),
  ('Recepcionista',      'Atendimento e controle de visitantes',          4),
  ('Vigia Noturno',      'Vigilância e rondas noturnas',                  5)
ON CONFLICT DO NOTHING;

-- =============================================
-- Políticas de segurança (Row Level Security)
-- =============================================
ALTER TABLE site_settings  ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_openings   ENABLE ROW LEVEL SECURITY;

-- Leitura pública (site)
CREATE POLICY "public_read_settings"  ON site_settings  FOR SELECT USING (true);
CREATE POLICY "public_read_gallery"   ON gallery_images FOR SELECT USING (active = true);
CREATE POLICY "public_read_jobs"      ON job_openings   FOR SELECT USING (active = true);

-- Escrita apenas para usuários autenticados (admin)
CREATE POLICY "auth_all_settings"  ON site_settings  FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_all_gallery"   ON gallery_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_all_jobs"      ON job_openings   FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =============================================
-- Storage: bucket para galeria
-- (Execute no painel Storage do Supabase)
-- =============================================
-- 1. Vá em Storage > New Bucket
-- 2. Nome: gallery
-- 3. Marque "Public bucket"
-- 4. Clique em Create

-- Política de upload para autenticados:
-- INSERT INTO storage.policies ... (configurar via painel)
