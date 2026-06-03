# 🚀 FASE 2 - GUÍA DE IMPLEMENTACIÓN

## 📊 QUÉ TENEMOS LISTO

✅ **Archivo JSON maestro**: 235+ temas con estructura completa
- Ubicación: `english-coffee-time-modules-FASE2.json`
- Contiene: Temas, recursos, preguntas

✅ **Archivo SQL**: Insert para Supabase
- Ubicación: `FASE2_INSERT_MODULES.sql`
- Contiene: 36 módulos + ejemplo de inserción

✅ **Documentación**: Estructura completa de 309 temas

---

## 🎯 ESTRUCTURA FINAL (309 TEMAS)

```
7 NIVELES
│
├── A1 - PRINCIPIANTE (24 temas)
│   ├── 5 Reading
│   ├── 6 Grammar
│   ├── 5 Vocabulary
│   ├── 4 Listening
│   ├── 2 Writing
│   └── 2 Speaking
│
├── A2 - ELEMENTAL (61 temas)
│   ├── 5 Reading
│   ├── 41 Grammar (DEL EXCEL)
│   ├── 5 Vocabulary
│   ├── 4 Listening
│   ├── 3 Writing
│   └── 3 Speaking
│
├── B1 - INTERMEDIO (56 temas)
│   ├── 5 Reading
│   ├── 36 Grammar (DEL EXCEL)
│   ├── 5 Vocabulary
│   ├── 4 Listening
│   ├── 3 Writing
│   └── 3 Speaking
│
├── B1+ - INTERMEDIO AVANZADO (59 temas)
│   ├── 5 Reading
│   ├── 39 Grammar (DEL EXCEL)
│   ├── 5 Vocabulary
│   ├── 4 Listening
│   ├── 3 Writing
│   └── 3 Speaking
│
├── B2 - INTERMEDIO ALTO (54 temas)
│   ├── 5 Reading
│   ├── 32 Grammar (DEL EXCEL)
│   ├── 5 Vocabulary
│   ├── 4 Listening
│   ├── 4 Writing
│   └── 4 Speaking
│
├── C1 - AVANZADO (28 temas) - A CREAR
│   ├── 5 Reading
│   ├── 6 Grammar
│   ├── 5 Vocabulary
│   ├── 4 Listening
│   ├── 4 Writing
│   └── 4 Speaking
│
└── C2 - DOMINIO (27 temas) - A CREAR
    ├── 5 Reading
    ├── 5 Grammar
    ├── 5 Vocabulary
    ├── 4 Listening
    ├── 4 Writing
    └── 4 Speaking

TOTAL: 309 TEMAS
```

---

## 📋 PASOS DE IMPLEMENTACIÓN

### PASO 1: ACTUALIZAR LA BD SUPABASE

**1.1** Abre Supabase: https://app.supabase.com

**1.2** Copia este SQL en SQL Editor:

```sql
-- Crear tabla modules si no existe
CREATE TABLE IF NOT EXISTS modules (
  id BIGSERIAL PRIMARY KEY,
  nivel VARCHAR(10) NOT NULL,
  module_type VARCHAR(50) NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(nivel, module_type)
);

-- Crear tabla module_topics
CREATE TABLE IF NOT EXISTS module_topics (
  id BIGSERIAL PRIMARY KEY,
  module_id BIGINT REFERENCES modules(id),
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  orden INT,
  tiempo_estimado INT,
  dificultad VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla topic_resources
CREATE TABLE IF NOT EXISTS topic_resources (
  id BIGSERIAL PRIMARY KEY,
  topic_id BIGINT REFERENCES module_topics(id),
  tipo VARCHAR(50),
  titulo VARCHAR(255),
  url TEXT,
  plataforma VARCHAR(100),
  duracion VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla questions
CREATE TABLE IF NOT EXISTS questions (
  id BIGSERIAL PRIMARY KEY,
  topic_id BIGINT REFERENCES module_topics(id),
  pregunta TEXT NOT NULL,
  opcion_a TEXT,
  opcion_b TEXT,
  opcion_c TEXT,
  opcion_d TEXT,
  respuesta_correcta VARCHAR(10),
  explicacion TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Deshabilitar RLS para testing
ALTER TABLE modules DISABLE ROW LEVEL SECURITY;
ALTER TABLE module_topics DISABLE ROW LEVEL SECURITY;
ALTER TABLE topic_resources DISABLE ROW LEVEL SECURITY;
ALTER TABLE questions DISABLE ROW LEVEL SECURITY;
```

**1.3** Click "Run"

---

### PASO 2: INSERTAR 36 MÓDULOS

**2.1** En SQL Editor, copia y ejecuta:

```sql
-- Insertar 36 módulos (6 niveles × 6 módulos)
INSERT INTO modules (nivel, module_type, nombre, descripcion) VALUES

-- A1
('A1', 'reading', 'A1 Reading', 'Reading comprehension for beginners'),
('A1', 'grammar', 'A1 Grammar', 'Basic grammar structures'),
('A1', 'vocabulary', 'A1 Vocabulary', 'Essential vocabulary'),
('A1', 'listening', 'A1 Listening', 'Basic listening'),
('A1', 'writing', 'A1 Writing', 'Simple written communication'),
('A1', 'speaking', 'A1 Speaking', 'Basic spoken communication'),

-- A2
('A2', 'reading', 'A2 Reading', 'Reading texts and articles'),
('A2', 'grammar', 'A2 Grammar', 'Elementary grammar - 41 topics'),
('A2', 'vocabulary', 'A2 Vocabulary', 'Everyday vocabulary'),
('A2', 'listening', 'A2 Listening', 'Understanding conversations'),
('A2', 'writing', 'A2 Writing', 'Writing emails and messages'),
('A2', 'speaking', 'A2 Speaking', 'Speaking in familiar situations'),

-- B1
('B1', 'reading', 'B1 Reading', 'Reading longer texts'),
('B1', 'grammar', 'B1 Grammar', 'Intermediate grammar - 36 topics'),
('B1', 'vocabulary', 'B1 Vocabulary', 'Expanded vocabulary'),
('B1', 'listening', 'B1 Listening', 'Understanding conversations'),
('B1', 'writing', 'B1 Writing', 'Writing essays'),
('B1', 'speaking', 'B1 Speaking', 'Speaking about topics'),

-- B1+
('B1+', 'reading', 'B1+ Reading', 'Reading complex texts'),
('B1+', 'grammar', 'B1+ Grammar', 'Upper-intermediate - 39 topics'),
('B1+', 'vocabulary', 'B1+ Vocabulary', 'Advanced vocabulary'),
('B1+', 'listening', 'B1+ Listening', 'Complex conversations'),
('B1+', 'writing', 'B1+ Writing', 'Complex essays'),
('B1+', 'speaking', 'B1+ Speaking', 'Complex topics'),

-- B2
('B2', 'reading', 'B2 Reading', 'Analyzing texts'),
('B2', 'grammar', 'B2 Grammar', 'Advanced grammar - 32 topics'),
('B2', 'vocabulary', 'B2 Vocabulary', 'Sophisticated vocabulary'),
('B2', 'listening', 'B2 Listening', 'Nuanced conversations'),
('B2', 'writing', 'B2 Writing', 'Well-structured documents'),
('B2', 'speaking', 'B2 Speaking', 'Abstract topics'),

-- C1
('C1', 'reading', 'C1 Reading', 'Sophisticated texts'),
('C1', 'grammar', 'C1 Grammar', 'Advanced grammar'),
('C1', 'vocabulary', 'C1 Vocabulary', 'Specialized vocabulary'),
('C1', 'listening', 'C1 Listening', 'All spoken English'),
('C1', 'writing', 'C1 Writing', 'Precise texts'),
('C1', 'speaking', 'C1 Speaking', 'Fluent and spontaneous');
```

---

### PASO 3: INSERTAR TEMAS (DESDE JSON)

**3.1** Descargar: `english-coffee-time-modules-FASE2.json`

**3.2** Este archivo contiene:
- 235+ temas
- 4 recursos por tema (Video, PDF, Ejercicio, Artículo)
- 4 preguntas por tema

**3.3** Para importar a Supabase:
- Opción A: Usar script Python (proporcionaré)
- Opción B: Importar manualmente desde Supabase UI
- Opción C: Usar API de Supabase

---

### PASO 4: ACTUALIZAR FRONTEND

**4.1** Crear página de módulos actualizada:
```
app/modules-dashboard.html
├── Mostrar módulos por nivel
├── Mostrar temas por módulo
├── Cargar recursos (videos, PDFs)
├── Mostrar preguntas del tema
└── Guardar progreso en BD
```

**4.2** Estructura HTML:
```html
<div class="modules-container">
  <!-- Selector de nivel -->
  <div class="level-selector">
    <button onclick="showLevel('A1')">A1</button>
    <button onclick="showLevel('A2')">A2</button>
    ...
  </div>
  
  <!-- Módulos del nivel seleccionado -->
  <div class="modules-grid">
    <div class="module-card" onclick="showModule('A1_reading')">
      📖 Reading
      <progress value="0" max="100"></progress>
    </div>
    ...
  </div>
  
  <!-- Temas del módulo -->
  <div class="topics-list">
    <div class="topic-item">
      <h4>Simple Texts and Announcements</h4>
      <p>4 recursos | 4 preguntas | 20 min</p>
      <button onclick="startTopic('A1_reading_001')">Empezar</button>
    </div>
  </div>
</div>
```

**4.3** Funciones JavaScript necesarias:
```javascript
// Cargar módulos por nivel
async function loadModules(nivel) {
  const { data, error } = await supabaseClient
    .from('modules')
    .select('*')
    .eq('nivel', nivel);
  // Mostrar módulos
}

// Cargar temas por módulo
async function loadTopics(moduleId) {
  const { data, error } = await supabaseClient
    .from('module_topics')
    .select('*')
    .eq('module_id', moduleId);
  // Mostrar temas
}

// Cargar recursos del tema
async function loadResources(topicId) {
  const { data, error } = await supabaseClient
    .from('topic_resources')
    .select('*')
    .eq('topic_id', topicId);
  // Mostrar recursos
}

// Cargar preguntas del tema
async function loadQuestions(topicId) {
  const { data, error } = await supabaseClient
    .from('questions')
    .select('*')
    .eq('topic_id', topicId);
  // Mostrar preguntas
}

// Guardar progreso
async function saveProgress(studentId, topicId, score) {
  const { error } = await supabaseClient
    .from('student_progress')
    .upsert({
      student_id: studentId,
      topic_id: topicId,
      puntuacion: score,
      completado: score >= 70,
      fecha: new Date().toISOString()
    });
}
```

---

### PASO 5: ACTUALIZAR DASHBOARD ESTUDIANTE

**5.1** Mostrar:
- Nivel del estudiante
- Módulos disponibles
- Progreso por módulo
- Temas completados
- Próximos temas recomendados

**5.2** Queries útiles:
```javascript
// Ver progreso por nivel
SELECT nivel, module_type, COUNT(DISTINCT topic_id) as temas_completados
FROM student_progress
JOIN module_topics ON topic_id = module_topics.id
JOIN modules ON modules.id = module_topics.module_id
WHERE student_id = $1
GROUP BY nivel, module_type;

// Próximos temas recomendados
SELECT * FROM module_topics
WHERE module_id IN (
  SELECT id FROM modules WHERE nivel = $1
)
AND id NOT IN (
  SELECT DISTINCT topic_id FROM student_progress WHERE student_id = $2
)
ORDER BY orden
LIMIT 3;
```

---

### PASO 6: ACTUALIZAR DASHBOARD PROFESOR

**6.1** Mostrar:
- Grupos de estudiantes
- Progreso por estudiante
- Módulos más completados
- Temas problemáticos
- Reportes descargables

**6.2** Ejemplo de query:
```javascript
// Progreso de estudiante
SELECT 
  u.name,
  COUNT(DISTINCT sp.topic_id) as temas_completados,
  AVG(sp.puntuacion) as promedio,
  COUNT(CASE WHEN sp.completado THEN 1 END) as temas_aprobados
FROM users u
LEFT JOIN student_progress sp ON u.id = sp.student_id
WHERE u.id IN (SELECT student_id FROM group_members WHERE group_id = $1)
GROUP BY u.id, u.name;
```

---

## 📦 ARCHIVOS ENTREGABLES

| Archivo | Descripción | Estado |
|---------|-------------|--------|
| `english-coffee-time-modules-FASE2.json` | 235+ temas con recursos | ✅ Listo |
| `FASE2_INSERT_MODULES.sql` | SQL para Supabase | ✅ Listo |
| `PLAN_FASE2_DETALLADO.md` | Plan completo | ✅ Listo |
| `ESTRUCTURA_MODULOS_FASE2.md` | Estructura detallada | ✅ Listo |
| `app/modules-dashboard.html` | Dashboard módulos | 🔲 A crear |
| `js/modules-functions.js` | Funciones JavaScript | 🔲 A crear |
| `app/dashboard-student-v2.html` | Dashboard estudiante v2 | 🔲 A crear |
| `app/dashboard-teacher-v2.html` | Dashboard profesor v2 | 🔲 A crear |

---

## 🎯 PRÓXIMOS PASOS INMEDIATOS

### Opción A: IMPLEMENTACIÓN RÁPIDA (3 días)
1. ✅ Ejecutar SQL en Supabase
2. ✅ Insertar 36 módulos
3. ✅ Cargar JSON en BD
4. ✅ Crear dashboard básico

### Opción B: IMPLEMENTACIÓN COMPLETA (1 semana)
1. ✅ Pasos A
2. ✅ Crear páginas de módulos mejoradas
3. ✅ Sistema de progreso completo
4. ✅ Dashboards profesor y estudiante
5. ✅ Reportes y exports

---

## ❓ PREGUNTAS A RESOLVER

1. **¿Quieres expandir los temas de A1, C1, C2 antes de insertar?**
   - Sí → Crearemos todos los 309 temas de forma manual
   - No → Completaremos después del MVP

2. **¿Agregar más recursos por tema?**
   - Actualmente: 4 recursos (video, pdf, ejercicio, artículo)
   - Podemos agregar: podcasts, más ejercicios, flashcards

3. **¿Crear sistema de certificados?**
   - PDF descargable al completar un nivel
   - Incluir puntuación y fecha

4. **¿Integrar Google Drive para PDFs?**
   - Sí → Usar API de Google Drive
   - No → Links externos

---

## ✨ PRÓXIMO: Ejecutar PASO 1 en Supabase

¿Comenzamos? 🚀

