-- ENGLISH COFFEE TIME - DATABASE SETUP
-- Ejecuta este SQL en tu proyecto Supabase

-- =============================================
-- 1. TABLA DE USUARIOS (Estudiantes y Profesores)
-- =============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) CHECK (role IN ('student', 'teacher')),
  nivel VARCHAR(5),  -- A1, A2, B1, B2, C1, C2 (solo para estudiantes)
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 2. TABLA DE GRUPOS (Para Profesores)
-- =============================================
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 3. TABLA DE MIEMBROS DEL GRUPO (Estudiantes en Grupos)
-- =============================================
CREATE TABLE group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  added_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(group_id, student_id)
);

-- =============================================
-- 4. TABLA DE MÓDULOS (Los 36 módulos: 6 niveles × 6 módulos)
-- =============================================
CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nivel VARCHAR(5) NOT NULL,  -- A1, A2, B1, B2, C1, C2
  module_type VARCHAR(50) NOT NULL,  -- reading, grammar, vocabulary, listening, writing, speaking
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  tema VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(nivel, module_type)
);

-- =============================================
-- 5. TABLA DE PREGUNTAS POR MÓDULO
-- =============================================
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  numero INT NOT NULL,
  pregunta TEXT NOT NULL,
  opciones TEXT[] NOT NULL,  -- Array de opciones
  respuesta_correcta INT NOT NULL,  -- Índice de la opción correcta
  explicacion TEXT,
  tema VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 6. TABLA DE EVALUACIÓN INICIAL (Test de Ubicación)
-- =============================================
CREATE TABLE initial_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  nivel_estimado VARCHAR(5) NOT NULL,
  puntuacion FLOAT NOT NULL,
  fecha TIMESTAMP DEFAULT NOW(),
  UNIQUE(student_id)
);

-- =============================================
-- 7. TABLA DE PROGRESO DEL ESTUDIANTE (Lo más importante)
-- =============================================
CREATE TABLE student_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  nivel VARCHAR(5) NOT NULL,
  module_type VARCHAR(50) NOT NULL,
  tema VARCHAR(100),
  completado BOOLEAN DEFAULT FALSE,
  puntuacion FLOAT,
  intentos INT DEFAULT 0,
  recursos_vistos TEXT[],  -- Array de IDs de recursos vistos
  fecha_inicio TIMESTAMP DEFAULT NOW(),
  fecha_completacion TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(student_id, module_id)
);

-- =============================================
-- 8. TABLA DE RECURSOS EDUCATIVOS
-- =============================================
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  tipo VARCHAR(50),  -- video, pdf, ejercicio, artículo, audio, etc.
  titulo VARCHAR(255) NOT NULL,
  url TEXT,
  duracion VARCHAR(20),  -- Para videos: "5 min", "8 min", etc.
  plataforma VARCHAR(100),  -- YouTube, PDF, englishexercises.org, etc.
  descripcion TEXT,
  descargable BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- ÍNDICES PARA MEJORAR RENDIMIENTO
-- =============================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_groups_teacher_id ON groups(teacher_id);
CREATE INDEX idx_group_members_group_id ON group_members(group_id);
CREATE INDEX idx_group_members_student_id ON group_members(student_id);
CREATE INDEX idx_modules_nivel ON modules(nivel);
CREATE INDEX idx_modules_type ON modules(module_type);
CREATE INDEX idx_questions_module_id ON questions(module_id);
CREATE INDEX idx_student_progress_student_id ON student_progress(student_id);
CREATE INDEX idx_student_progress_module_id ON student_progress(module_id);
CREATE INDEX idx_initial_assessments_student_id ON initial_assessments(student_id);
CREATE INDEX idx_resources_module_id ON resources(module_id);

-- =============================================
-- VISTA: Progreso del Estudiante por Nivel
-- =============================================
CREATE VIEW student_level_progress AS
SELECT 
  sp.student_id,
  sp.nivel,
  COUNT(*) as total_modules,
  COUNT(CASE WHEN sp.completado = TRUE THEN 1 END) as completed_modules,
  AVG(sp.puntuacion) as average_score,
  ROUND(COUNT(CASE WHEN sp.completado = TRUE THEN 1 END)::numeric / COUNT(*)::numeric * 100, 2) as progress_percentage
FROM student_progress sp
GROUP BY sp.student_id, sp.nivel;

-- =============================================
-- VISTA: Grupo de Estudiantes con su Progreso
-- =============================================
CREATE VIEW group_student_progress AS
SELECT 
  g.id as group_id,
  g.name as group_name,
  gm.student_id,
  u.name as student_name,
  u.nivel as current_level,
  COUNT(sp.id) as modules_attempted,
  COUNT(CASE WHEN sp.completado = TRUE THEN 1 END) as modules_completed,
  AVG(sp.puntuacion) as average_score
FROM groups g
LEFT JOIN group_members gm ON g.id = gm.group_id
LEFT JOIN users u ON gm.student_id = u.id
LEFT JOIN student_progress sp ON u.id = sp.student_id
GROUP BY g.id, g.name, gm.student_id, u.name, u.nivel;

-- =============================================
-- POLICIES DE SEGURIDAD (RLS - Row Level Security)
-- =============================================

-- Habilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;

-- Políticas para Usuarios
CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  USING (auth.uid()::text = id::text);

-- Políticas para Grupos (solo el profesor propietario)
CREATE POLICY "Teachers can view their own groups"
  ON groups FOR SELECT
  USING (teacher_id = auth.uid()::uuid);

CREATE POLICY "Teachers can create groups"
  ON groups FOR INSERT
  WITH CHECK (teacher_id = auth.uid()::uuid);

-- Políticas para Miembros del Grupo
CREATE POLICY "Students can view their groups"
  ON group_members FOR SELECT
  USING (student_id = auth.uid()::uuid);

-- Políticas para Progreso del Estudiante
CREATE POLICY "Students can view their own progress"
  ON student_progress FOR SELECT
  USING (student_id = auth.uid()::uuid);

CREATE POLICY "Students can insert their progress"
  ON student_progress FOR INSERT
  WITH CHECK (student_id = auth.uid()::uuid);

-- =============================================
-- INSERTS DE EJEMPLO (Módulos)
-- =============================================

-- Nivel A1
INSERT INTO modules (nivel, module_type, nombre, descripcion, tema) VALUES
  ('A1', 'reading', 'Reading A1', 'Comprensión de textos simples', 'Textos básicos'),
  ('A1', 'grammar', 'Grammar A1', 'Presente simple y básico', 'Gramática básica'),
  ('A1', 'vocabulary', 'Vocabulary A1', 'Vocabulario básico', 'Palabras cotidianas'),
  ('A1', 'listening', 'Listening A1', 'Audios simples', 'Pronunciación básica'),
  ('A1', 'writing', 'Writing A1', 'Escritura básica', 'Oraciones simples'),
  ('A1', 'speaking', 'Speaking A1', 'Expresión oral básica', 'Pronunciación');

-- Nivel B1
INSERT INTO modules (nivel, module_type, nombre, descripcion, tema) VALUES
  ('B1', 'reading', 'Reading B1', 'Artículos e historias', 'Comprensión media'),
  ('B1', 'grammar', 'Grammar B1', 'Phrasal verbs y past perfect', 'Gramática intermedia'),
  ('B1', 'vocabulary', 'Vocabulary B1', 'Vocabulario de negocios', 'Expresiones útiles'),
  ('B1', 'listening', 'Listening B1', 'Entrevistas y conversaciones', 'Comprensión media'),
  ('B1', 'writing', 'Writing B1', 'Emails y descripciones', 'Escritura intermedia'),
  ('B1', 'speaking', 'Speaking B1', 'Presentaciones y discusiones', 'Fluidez intermedia');

-- Nota: Continúa con A2, B2, C1, C2 siguiendo el mismo patrón

-- =============================================
-- QUERY DE EJEMPLO: Ver Progreso de un Estudiante
-- =============================================
-- SELECT 
--   sp.student_id,
--   sp.nivel,
--   sp.module_type,
--   sp.puntuacion,
--   sp.completado,
--   sp.fecha_completacion
-- FROM student_progress sp
-- WHERE sp.student_id = '...'  -- Reemplaza con el UUID del estudiante
-- ORDER BY sp.nivel, sp.module_type;

-- =============================================
-- QUERY DE EJEMPLO: Ver Progreso de un Grupo
-- =============================================
-- SELECT * FROM group_student_progress 
-- WHERE group_id = '...'  -- Reemplaza con el UUID del grupo
-- ORDER BY student_name;
