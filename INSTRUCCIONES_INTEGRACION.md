# 🚀 Instrucciones de Integración - Dashboard Actualizado

## Resumen de Cambios

Has recibido 4 archivos principales:

1. **Temas_Competencias_por_Nivel_Modulo.csv** - Lista completa en formato CSV (180+ competencias)
2. **english-coffee-time-modules-UPDATED.json** - JSON mejorado (estructura completa del currículo)
3. **dashboard-student-MEJORADO.html** - Dashboard HTML nuevo (interfaz visual mejorada)
4. **Guia_Mejoras_Pedagogicas.md** - Documentación pedagógica completa

---

## PASO 1: Copia el archivo JSON al repositorio

### Opción A: Reemplazar completamente (RECOMENDADO)

1. Ve a tu repositorio GitHub: https://github.com/fams26/english-coffee-time-pro
2. Abre el archivo `english-coffee-time-modules-FASE2.json`
3. Haz clic en "Edit this file" (ícono de lápiz)
4. **Borra TODO el contenido** actual
5. **Pega TODO el contenido** del archivo `english-coffee-time-modules-UPDATED.json` que recibiste
6. Haz commit con mensaje: `"Updated: 180+ competencies curriculum - CEFR aligned"`

### Opción B: Crear nuevo archivo (ALTERNATIVA)

1. Ve a tu repositorio
2. Haz clic en "Add file" → "Create new file"
3. Nombre: `english-coffee-time-modules-UPDATED.json`
4. Pega el contenido completo del archivo JSON
5. Haz commit

**VENTAJA:** Conservas el archivo antiguo como respaldo (puedes comparar después)

---

## PASO 2: Actualiza los archivos HTML del dashboard

### Para dashboard-student.html (o el que uses actualmente)

**Opción A: Reemplazar completamente**

1. Abre tu archivo actual: `app/dashboard-student.html` (o la ruta que uses)
2. Reemplaza TODO el código con el contenido de `dashboard-student-MEJORADO.html`

**Opción B: Integración selectiva (si tienes código customizado)**

Si tienes funcionalidad personalizada, copia solo estas secciones:

```html
<!-- DEL ARCHIVO NUEVO: Copia estas secciones -->

1. <style> ... </style>
   (Todo el CSS mejorado - reemplaza tu CSS anterior)

2. <!-- Data const modulesData = { ... } -->
   (Datos de niveles y módulos - actualiza esto)

3. <script> ... </script>
   (Funciones JavaScript - agrega o reemplaza)
```

---

## PASO 3: Actualiza tu archivo JavaScript de datos

Si tienes un archivo aparte `js/modules-data.js` o similar:

### Opción: Exportar JSON como JavaScript

Crea/actualiza `data/english-coffee-time-modules-UPDATED.json`:

```javascript
// En lugar de esto:
const modules = { ... };

// Usa esto (JSON puro):
// Luego lo importas con:
fetch('data/english-coffee-time-modules-UPDATED.json')
  .then(response => response.json())
  .then(data => {
    const modulesData = data;
    // Usar modulesData aquí
  });
```

---

## PASO 4: (OPCIONAL) Integra con Supabase

Si usas **Supabase** como base de datos:

### Crear tabla en Supabase

```sql
CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  level_id VARCHAR(10),
  level_name VARCHAR(50),
  module_id VARCHAR(30),
  module_name VARCHAR(50),
  module_type VARCHAR(20),
  competency_id VARCHAR(30),
  competency_title VARCHAR(200),
  descriptor TEXT,
  context TEXT,
  examples TEXT[],
  word_limit VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insertar datos desde JSON
INSERT INTO modules (level_id, level_name, module_id, module_name, module_type, competency_id, competency_title, descriptor, context)
VALUES
('A1', 'A1 - Elemental', 'A1_Grammar', 'Gramática', 'Grammar', 'A1_G1', 'Present Simple', '...', '...');
```

Luego en tu código:

```javascript
// Cargar desde Supabase en lugar de JSON
const { data, error } = await supabase
  .from('modules')
  .select('*')
  .eq('level_id', 'A1');
```

---

## PASO 5: Verifica los cambios localmente

### Si usas Node.js / npm:

```bash
# 1. Clona tu repo actualizado
git clone https://github.com/fams26/english-coffee-time-pro.git

# 2. Navega al directorio
cd english-coffee-time-pro

# 3. Inicia servidor local
python -m http.server 8000
# O si tienes Node:
npx http-server

# 4. Abre en navegador
http://localhost:8000/dashboard-student-MEJORADO.html
```

### Si usas Vercel:

```bash
# Vercel actualiza automáticamente cuando haces push a GitHub
# Solo haz commit y push:
git add .
git commit -m "Updated curriculum dashboard with 180+ competencies"
git push

# Vercel redesplegará automáticamente
# Tu sitio actualizará en: https://english-coffee-time-pro.vercel.app
```

---

## PASO 6: Actualiza la estructura de rutas (SI APLICA)

Si tu dashboard está en diferentes rutas:

### Actualiza referencias en index.html o landing.html

```html
<!-- Antes: -->
<a href="app/dashboard.html">Dashboard</a>

<!-- Después (si cambiaste el nombre): -->
<a href="app/dashboard-student-MEJORADO.html">Dashboard</a>

<!-- O mantén el nombre original y solo reemplaza el contenido -->
<a href="app/dashboard-student.html">Dashboard</a>
```

---

## PASO 7: Verifica la integración de datos

Abre las Developer Tools (F12) en tu navegador y verifica:

### Console
```javascript
// Deberías poder ver los datos:
console.log(modulesData.levels);

// Debería mostrar:
// Array(5) [ {id: "A1", name: "A1 - Elemental", ...}, ... ]
```

### Network
- Verifica que el JSON carga correctamente
- Si ves 404, revisa la ruta del archivo JSON

---

## PROBLEMAS COMUNES & SOLUCIONES

### ❌ Problema: "Uncaught SyntaxError: Unexpected token"

**Causa:** JSON malformado  
**Solución:**
1. Valida el JSON: https://jsonlint.com/
2. Pega todo el contenido del archivo ACTUALIZADO (no editado)
3. Verifica que no hay caracteres especiales rotos

### ❌ Problema: Los módulos no aparecen

**Causa:** JavaScript no encuentra el JSON o los datos  
**Solución:**
1. Abre DevTools → Console
2. Verifica: `console.log(modulesData)`
3. Si no existe, carga antes el JSON:
```javascript
// Asegúrate que esto está ANTES de usar modulesData:
const modulesData = {
  levels: [ ... ]
};
```

### ❌ Problema: Estilos no se ven correctamente

**Causa:** CSS no se aplicó  
**Solución:**
1. Abre DevTools → Elements
2. Verifica que `<style>` está dentro de `<head>`
3. Hard refresh: `Ctrl+Shift+R` (o `Cmd+Shift+R` en Mac)

### ❌ Problema: Modal no abre

**Causa:** JavaScript no se ejecutó  
**Solución:**
1. Verifica que `<script>` está al final del `</body>`
2. Revisa Console por errores
3. Asegúrate que elemento con ID `competencyModal` existe

---

## PASO 8: Configura la integración con Supabase (AVANZADO)

Si quieres cargar datos dinámicamente desde Supabase:

### 1. Importa el JSON a Supabase

```javascript
// Script para poblar Supabase desde JSON
import moduleData from './english-coffee-time-modules-UPDATED.json';

async function populateSupabase() {
  for (const level of moduleData.levels) {
    for (const module of level.modules) {
      for (const competency of module.competencies) {
        const { error } = await supabase
          .from('modules')
          .insert({
            level_id: level.id,
            level_name: level.name,
            module_id: module.id,
            module_name: module.name,
            module_type: module.type,
            competency_id: competency.id,
            competency_title: competency.title,
            descriptor: competency.descriptor,
            context: competency.context
          });
        
        if (error) console.error('Error:', error);
      }
    }
  }
}
```

### 2. Consulta desde Supabase en el dashboard

```javascript
async function loadModules() {
  const { data } = await supabase
    .from('modules')
    .select('*');
  
  // Agrupar por nivel, módulo
  const grouped = groupByLevel(data);
  renderDashboard(grouped);
}
```

---

## CHECKLIST DE INTEGRACIÓN

- [ ] Copié el archivo JSON actualizado al repositorio
- [ ] Reemplacé el archivo `english-coffee-time-modules-FASE2.json` O creé uno nuevo
- [ ] Actualicé el dashboard HTML (completamente o parcialmente)
- [ ] Verifiqué los cambios localmente (http://localhost:8000)
- [ ] Hice commit y push a GitHub
- [ ] Vercel redesplegó automáticamente
- [ ] Abrí el sitio en vivo y probé que funciona
- [ ] Los módulos se muestran correctamente
- [ ] Los modales abren y muestran detalles
- [ ] Los estilos se ven bien (colores, responsive)

---

## SIGUIENTES PASOS

### 1. Integra las preguntas con las competencias

Actualiza tu banco de preguntas (`questions.json`) para mapear a los IDs de competencias:

```json
{
  "question_id": "Q001",
  "competency_id": "A1_G1",  // ← Referencia a competencia
  "level": "A1",
  "module": "Grammar",
  "question": "Which is correct: 'I am' or 'I is'?",
  "options": ["I am", "I is"],
  "correct": "I am"
}
```

### 2. Crea reportes de progreso

Muestra al estudiante qué competencias ha dominado:

```javascript
function getCompletedCompetencies(studentId) {
  // Consultar competencias completadas
  const completed = supabase
    .from('student_progress')
    .select('competency_id')
    .eq('student_id', studentId);
  
  return completed;
}
```

### 3. Implementa evaluación por competencia

```javascript
function evaluateCompetency(competencyId, score) {
  if (score >= 80) {
    // Marcar competencia como completada
    saveProgress(competencyId, 'COMPLETED');
  }
}
```

---

## SOPORTE TÉCNICO

### Si algo no funciona:

1. **Verifica el JSON:** https://jsonlint.com/ (pega el contenido)
2. **Revisa la consola:** F12 → Console (busca errores en rojo)
3. **Compara archivos:** Usa un comparador online para ver qué cambió
4. **Prueba en otro navegador:** (Firefox, Chrome, Safari)

### Recursos útiles:

- 📖 Documentación JSON: https://www.json.org/
- 🔍 Validador JSON: https://jsonlint.com/
- 💻 Developer Tools: https://developer.mozilla.org/docs/
- 🚀 Vercel Docs: https://vercel.com/docs

---

## RESUMEN

| Acción | Comando | Tiempo |
|--------|---------|--------|
| Copiar JSON | Ctrl+C, Ctrl+V | 1 min |
| Actualizar HTML | Reemplazar archivo | 2 min |
| Commit y Push | `git add . && git commit && git push` | 2 min |
| Verificar en vivo | Abrir URL en navegador | 1 min |
| **TOTAL** | **INTEGRACIÓN COMPLETA** | **~6 minutos** |

---

**¡Listo!** Tu plataforma ahora tiene un currículo de 180+ competencias alineado con CEFR. 

¿Preguntas? Consulta la documentación pedagógica en: `Guia_Mejoras_Pedagogicas.md`