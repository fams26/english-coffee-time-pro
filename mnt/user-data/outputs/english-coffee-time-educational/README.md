# ☕ English Coffee Time - Plataforma Educativa

Plataforma educativa **gratuita** para aprender inglés con seguimiento detallado de progreso por tema.

## 🎯 Características

✅ **Test de Ubicación** - Determina tu nivel MCER automáticamente (A1-C2)
✅ **6 Niveles Estructurados** - Desde principiante hasta dominio
✅ **6 Módulos por Nivel** - Reading, Grammar, Vocabulary, Listening, Writing, Speaking
✅ **Recursos Enlazados** - Videos, PDFs, ejercicios interactivos, artículos
✅ **Tracking Detallado** - Registra cada tema visto por estudiante
✅ **Dashboard de Estudiante** - Ve tu progreso en tiempo real
✅ **Panel de Profesor** - Crea grupos y visualiza el progreso de tus estudiantes
✅ **100% Gratuito** - Acceso completo sin pagos

---

## 🚀 Quick Start

### 1. Clonar Repositorio
```bash
git clone https://github.com/TU_USUARIO/english-coffee-time-educational.git
cd english-coffee-time-educational
```

### 2. Setup Local (Opcional - para testing)
```bash
# Los archivos son HTML/JS puro, abre en navegador:
open index.html

# O usa un servidor local:
python3 -m http.server 8000
# Luego: http://localhost:8000
```

### 3. Configurar Supabase (Base de Datos)

#### 3.1 Crear Proyecto Supabase
1. Ve a https://supabase.com/dashboard
2. Click "New Project"
3. Nombre: `english-coffee-time`
4. Contraseña: Crea una fuerte
5. Click "Create new project" y espera 2-3 minutos

#### 3.2 Configurar Base de Datos
1. Ve a "SQL Editor"
2. Click "New Query"
3. Copia TODO el contenido de `DATABASE_SETUP.md`
4. Pega en SQL Editor
5. Click "Run"

#### 3.3 Obtener Credenciales
1. Ve a "Project Settings" (rueda engranaje)
2. Click "API"
3. Copia:
   - **Project URL**: https://... (guarda como `SUPABASE_URL`)
   - **Anon Public Key**: eyJ... (guarda como `SUPABASE_ANON_KEY`)

### 4. Configurar Vercel (Hosting)

#### 4.1 Crear .env.local
En la raíz del proyecto, crea archivo `.env.local`:
```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**IMPORTANTE:** Este archivo NO se pushea a GitHub (está en `.gitignore`)

#### 4.2 Configurar Vercel
1. Ve a https://vercel.com/dashboard
2. Click "Import Project"
3. Selecciona tu repositorio GitHub
4. En "Environment Variables":
   - Agrega `VITE_SUPABASE_URL` = tu valor
   - Agrega `VITE_SUPABASE_ANON_KEY` = tu valor
5. Click "Deploy"

**Tu sitio estará en:** `https://english-coffee-time.vercel.app`

---

## 📁 Estructura de Carpetas

```
english-coffee-time-educational/
├── index.html                    # Landing page
├── signup.html                   # Registro
├── signin.html                   # Login
├── DATABASE_SETUP.md             # Setup de BD
├── README.md                     # Este archivo
├── .env.example                  # Template de variables
├── .gitignore                    # Archivos a ignorar
├── vercel.json                   # Config Vercel
│
├── app/
│   ├── initial-test.html        # Test de ubicación (30 preguntas)
│   ├── dashboard-student.html   # Dashboard estudiante
│   ├── test-module.html         # Hacer un módulo
│   └── dashboard-teacher.html   # Panel profesor
│
└── data/
    └── modules.json             # Temas y recursos
```

---

## 🔄 Flujo de Usuario

### 👨‍🎓 ESTUDIANTE

1. **Registro** → Selecciona "Estudiante" → Crea cuenta
2. **Test Inicial** → 30 preguntas → Se asigna nivel (A1-C2)
3. **Dashboard** → Ver niveles disponibles → Seleccionar módulo
4. **Hacer Módulo** → Responder preguntas → Obtener puntuación
5. **Progreso** → Dashboard muestra qué temas completó

### 👨‍🏫 PROFESOR

1. **Registro** → Selecciona "Profesor" → Crea cuenta
2. **Dashboard Profesor** → Crear grupo → Asignar estudiantes
3. **Ver Progreso** → Click en grupo → Ver qué temas hizo cada estudiante
4. **Planificar** → Saber qué temas están pendientes
5. **Descargar Reportes** → PDF/CSV con progreso

---

## 📊 Base de Datos

### Tablas Principales

- **users**: Estudiantes y profesores
- **groups**: Grupos creados por profesores
- **group_members**: Estudiantes en cada grupo
- **modules**: Los 36 módulos (6 niveles × 6 tipos)
- **questions**: Preguntas de cada módulo
- **student_progress**: ⭐ LA TABLA CLAVE - Trackea cada tema por estudiante
- **initial_assessments**: Resultado del test inicial
- **resources**: Links a videos, PDFs, ejercicios

### Query Útil: Ver Progreso de un Estudiante

```sql
SELECT 
  sp.nivel,
  sp.module_type,
  sp.tema,
  sp.puntuacion,
  sp.completado,
  sp.fecha_completacion
FROM student_progress sp
WHERE sp.student_id = 'USER_ID_HERE'
ORDER BY sp.nivel DESC, sp.module_type;
```

---

## 🔐 Seguridad

- ✅ Datos almacenados en Supabase (encriptado)
- ✅ Cada usuario solo ve sus propios datos
- ✅ Profesores solo ven sus grupos
- ✅ Row Level Security (RLS) habilitado en BD
- ✅ Hosting seguro en Vercel (HTTPS automático)

---

## 📈 Próximos Pasos (Fase 2+)

- [ ] Integrar Supabase Auth completo
- [ ] Agregar más módulos (C1, C2 completos)
- [ ] Certificados descargables en PDF
- [ ] Sistema de badges y gamificación
- [ ] Email automático de confirmación
- [ ] Reportes avanzados para profesor
- [ ] Export de datos a CSV/Excel
- [ ] App móvil (PWA)
- [ ] Evaluación de Writing con IA
- [ ] Integración con Google Classroom

---

## 🛠️ Tecnología

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Supabase (PostgreSQL + Auth)
- **Hosting**: Vercel
- **Base de Datos**: PostgreSQL (Supabase)

---

## 📝 Variables de Entorno

Copia `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Luego completa con tus valores:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📞 Soporte

- 📧 Email: info@englishcoffeetime.com
- 💬 Issues: https://github.com/TU_USUARIO/english-coffee-time-educational/issues
- 📚 Documentación: Consulta DATABASE_SETUP.md

---

## 📄 Licencia

Código abierto bajo licencia MIT. Úsalo libremente.

---

## 🎓 Créditos

Plataforma educativa diseñada para **English Coffee Time** por [Tu Nombre]

---

## 🚀 ¡Lanzamiento!

### Día 1: Desarrollo
- ✅ Estructura HTML base
- ✅ Test inicial
- ✅ Dashboard estudiante
- ✅ Panel profesor

### Día 2: Setup
- [ ] Supabase configurado
- [ ] Vercel deploying
- [ ] Variables de entorno

### Día 3: En Vivo
- [ ] 🎉 URL en vivo
- [ ] Primeros usuarios
- [ ] Testing

---

**¡Gracias por usar English Coffee Time! 📚☕**
