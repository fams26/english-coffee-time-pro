-- Crear tabla de competencias desde el CSV
CREATE TABLE IF NOT EXISTS competencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nivel VARCHAR(2) NOT NULL,           -- A1, A2, B1, B2, C1
  modulo VARCHAR(50) NOT NULL,         -- Grammar, Reading, Writing, Listening, Speaking, Vocabulary
  competencia TEXT NOT NULL,           -- Nombre de la competencia
  descriptores TEXT,                   -- Qué debe saber hacer
  contextos_uso TEXT,                  -- Cuándo se usa
  orden INT DEFAULT 0,                 -- Para ordenar dentro del módulo
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Crear índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_competencies_nivel ON competencies(nivel);
CREATE INDEX IF NOT EXISTS idx_competencies_nivel_modulo ON competencies(nivel, modulo);

-- Habilitar Row Level Security (RLS)
ALTER TABLE competencies ENABLE ROW LEVEL SECURITY;

-- Política: Todos pueden leer competencias (públicas)
CREATE POLICY "competencies_select" ON competencies
  FOR SELECT
  USING (true);

-- Política: Solo administradores pueden modificar
-- (Si tienes tabla de roles)
