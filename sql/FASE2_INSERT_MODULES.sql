-- ============================================================
-- FASE 2: INSERT MÓDULOS, TEMAS Y PREGUNTAS EN SUPABASE
-- ============================================================

-- 1. LIMPIAR DATOS ANTERIORES (OPCIONAL)
-- DELETE FROM questions WHERE module_id IN (SELECT id FROM modules);
-- DELETE FROM module_topics WHERE module_id IN (SELECT id FROM modules);
-- DELETE FROM modules;

-- ============================================================
-- 2. INSERTAR 36 MÓDULOS (6 niveles × 6 módulos)
-- ============================================================

INSERT INTO modules (nivel, module_type, nombre, descripcion, created_at) VALUES

-- NIVEL A1
('A1', 'reading', 'A1 Reading', 'Reading comprehension for beginners', NOW()),
('A1', 'grammar', 'A1 Grammar', 'Basic grammar structures', NOW()),
('A1', 'vocabulary', 'A1 Vocabulary', 'Essential vocabulary for daily communication', NOW()),
('A1', 'listening', 'A1 Listening', 'Basic listening comprehension', NOW()),
('A1', 'writing', 'A1 Writing', 'Simple written communication', NOW()),
('A1', 'speaking', 'A1 Speaking', 'Basic spoken communication', NOW()),

-- NIVEL A2
('A2', 'reading', 'A2 Reading', 'Reading simple texts and articles', NOW()),
('A2', 'grammar', 'A2 Grammar', 'Elementary grammar with 41 topics from Excel', NOW()),
('A2', 'vocabulary', 'A2 Vocabulary', 'Vocabulary for everyday situations', NOW()),
('A2', 'listening', 'A2 Listening', 'Understanding conversations and announcements', NOW()),
('A2', 'writing', 'A2 Writing', 'Writing emails, messages, and descriptions', NOW()),
('A2', 'speaking', 'A2 Speaking', 'Speaking in familiar situations', NOW()),

-- NIVEL B1
('B1', 'reading', 'B1 Reading', 'Reading longer texts and articles', NOW()),
('B1', 'grammar', 'B1 Grammar', 'Intermediate grammar with 36 topics from Excel', NOW()),
('B1', 'vocabulary', 'B1 Vocabulary', 'Expanded vocabulary for complex topics', NOW()),
('B1', 'listening', 'B1 Listening', 'Understanding longer conversations', NOW()),
('B1', 'writing', 'B1 Writing', 'Writing longer texts and essays', NOW()),
('B1', 'speaking', 'B1 Speaking', 'Speaking about familiar and personal topics', NOW()),

-- NIVEL B1+
('B1+', 'reading', 'B1+ Reading', 'Reading complex texts', NOW()),
('B1+', 'grammar', 'B1+ Grammar', 'Upper-intermediate grammar with 39 topics from Excel', NOW()),
('B1+', 'vocabulary', 'B1+ Vocabulary', 'Advanced vocabulary for upper-intermediate level', NOW()),
('B1+', 'listening', 'B1+ Listening', 'Understanding complex conversations', NOW()),
('B1+', 'writing', 'B1+ Writing', 'Writing complex essays and reports', NOW()),
('B1+', 'speaking', 'B1+ Speaking', 'Speaking clearly about complex topics', NOW()),

-- NIVEL B2
('B2', 'reading', 'B2 Reading', 'Reading and analyzing complex texts', NOW()),
('B2', 'grammar', 'B2 Grammar', 'Advanced grammar with 32 topics from Excel', NOW()),
('B2', 'vocabulary', 'B2 Vocabulary', 'Sophisticated vocabulary and expressions', NOW()),
('B2', 'listening', 'B2 Listening', 'Understanding nuances in conversations', NOW()),
('B2', 'writing', 'B2 Writing', 'Writing well-structured documents', NOW()),
('B2', 'speaking', 'B2 Speaking', 'Speaking fluently on abstract topics', NOW()),

-- NIVEL C1
('C1', 'reading', 'C1 Reading', 'Reading and analyzing sophisticated texts', NOW()),
('C1', 'grammar', 'C1 Grammar', 'Advanced grammar for proficient users', NOW()),
('C1', 'vocabulary', 'C1 Vocabulary', 'Specialized vocabulary and nuances', NOW()),
('C1', 'listening', 'C1 Listening', 'Understanding all types of spoken English', NOW()),
('C1', 'writing', 'C1 Writing', 'Writing precise and well-argued texts', NOW()),
('C1', 'speaking', 'C1 Speaking', 'Speaking with fluency and spontaneity', NOW());

-- ============================================================
-- 3. INSERTAR TEMAS CON RECURSOS Y PREGUNTAS
-- ============================================================

-- EJEMPLO: A1 READING - Simple Texts and Announcements
-- (El resto de los 235+ temas viene del archivo JSON)

INSERT INTO module_topics 
(module_id, titulo, descripcion, orden, tiempo_estimado, dificultad) 
SELECT id, 'Simple Texts and Announcements', 'Learn to read signs, notices, and basic announcements', 1, 20, 'muy_facil'
FROM modules WHERE nivel = 'A1' AND module_type = 'reading';

-- Insertar recursos para este tema
INSERT INTO topic_resources 
(topic_id, tipo, titulo, url, plataforma, duracion)
SELECT 
  (SELECT id FROM module_topics WHERE titulo = 'Simple Texts and Announcements' LIMIT 1),
  'video',
  'A1 Reading - Simple Announcements',
  'https://www.youtube.com/watch?v=HVwYxX4q0FA',
  'YouTube',
  '6 min'
UNION ALL
SELECT 
  (SELECT id FROM module_topics WHERE titulo = 'Simple Texts and Announcements' LIMIT 1),
  'pdf',
  'A1 Reading Comprehension Worksheet',
  'https://www.englishactivities.net/A1-reading',
  'englishactivities.net',
  '3 pages'
UNION ALL
SELECT 
  (SELECT id FROM module_topics WHERE titulo = 'Simple Texts and Announcements' LIMIT 1),
  'ejercicio',
  'Practice A1 Reading',
  'https://www.englishexercises.org/makeagame/gamevocab.asp?v=118',
  'englishexercises.org',
  '10-15 min';

-- Insertar preguntas para este tema
INSERT INTO questions 
(topic_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion)
SELECT 
  (SELECT id FROM module_topics WHERE titulo = 'Simple Texts and Announcements' LIMIT 1),
  'What does "CLOSED" mean?',
  'Open',
  'Not open',
  'Opening soon',
  'Will open',
  'B',
  '"CLOSED" means the place is not open'
UNION ALL
SELECT 
  (SELECT id FROM module_topics WHERE titulo = 'Simple Texts and Announcements' LIMIT 1),
  'Read: "Open 9am - 5pm". What time does it close?',
  '9am',
  '5pm',
  'Morning',
  'Afternoon',
  'B',
  'The hyphen (-) shows the closing time is 5pm'
UNION ALL
SELECT 
  (SELECT id FROM module_topics WHERE titulo = 'Simple Texts and Announcements' LIMIT 1),
  'Where do you see "No Smoking"?',
  'Restaurant',
  'Park',
  'Hospital',
  'All places',
  'A',
  'This sign appears in restaurants, offices, and hospitals'
UNION ALL
SELECT 
  (SELECT id FROM module_topics WHERE titulo = 'Simple Texts and Announcements' LIMIT 1),
  'What does "PUSH" mean on a door?',
  'Pull the door',
  'Push the door',
  'Don''t enter',
  'Emergency exit',
  'B',
  '"PUSH" tells you to push the door to open it';

-- ============================================================
-- 4. VERIFICACIÓN
-- ============================================================

-- Ver módulos creados
SELECT COUNT(*) as total_modulos FROM modules;

-- Ver temas creados
SELECT nivel, module_type, COUNT(*) as total_temas 
FROM module_topics 
GROUP BY nivel, module_type 
ORDER BY nivel, module_type;

-- Ver preguntas creadas
SELECT COUNT(*) as total_preguntas FROM questions;

-- Ver recursos
SELECT COUNT(*) as total_recursos FROM topic_resources;

-- ============================================================
-- NOTA: Este es un ejemplo. Repetir para todos los 309 temas
-- El archivo JSON tiene toda la estructura lista para importar
-- ============================================================
