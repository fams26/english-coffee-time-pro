# 🚀 DEPLOYMENT RÁPIDO - HACER EN 1 HORA

## ✅ ANTES DE EMPEZAR

Tienes:
- [ ] Cuenta GitHub
- [ ] Cuenta Supabase (free)
- [ ] Cuenta Vercel (free)

---

## ⏱️ PASO 1 (10 minutos): PREPARAR GITHUB

```bash
# 1. Abre https://github.com/new
# 2. Nombre del repo: english-coffee-time-educational
# 3. Descripción: "Plataforma educativa para aprender inglés"
# 4. Público
# 5. Crear repositorio

# 6. En tu terminal:
cd english-coffee-time-educational

git init
git add .
git commit -m "Initial commit: MVP educativo"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/english-coffee-time-educational.git
git push -u origin main
```

**TIEMPO:** 10 min

---

## ⏱️ PASO 2 (15 minutos): CONFIGURAR SUPABASE

### 2.1 Crear Proyecto
```
1. Ve a https://supabase.com/dashboard
2. Click "New Project"
3. Nombre: english-coffee-time
4. Password: Tu contraseña fuerte
5. Region: Closest to you (Latinoamérica si aplica)
6. Click "Create new project"
7. ⏳ Espera 2-3 minutos
```

### 2.2 Ejecutar SQL Setup
```
1. En tu proyecto, click "SQL Editor" (left sidebar)
2. Click "New Query"
3. Abre el archivo DATABASE_SETUP.md de tu proyecto
4. Copia TODO el contenido SQL
5. Pega en el SQL Editor
6. Click "Run"
7. ✅ Espera a que complete
```

### 2.3 Obtener Credenciales
```
1. Click "Settings" (rueda engranaje abajo left)
2. Click "API"
3. Bajo "Project URL": Copia https://...supabase.co
   → Guarda en un texto como SUPABASE_URL
4. Bajo "Anon Public": Copia la key eyJ...
   → Guarda como SUPABASE_ANON_KEY
```

**TIEMPO:** 15 min

---

## ⏱️ PASO 3 (15 minutos): CONFIGURAR VERCEL

### 3.1 Conectar a Vercel
```
1. Ve a https://vercel.com/dashboard
2. Click "Add New"
3. Click "Project"
4. Click "Import Git Repository"
5. Busca "english-coffee-time-educational"
6. Click "Import"
```

### 3.2 Agregar Variables de Entorno
```
Cuando Vercel te pida "Environment Variables":

VITE_SUPABASE_URL = [Pega tu URL de Supabase]
VITE_SUPABASE_ANON_KEY = [Pega tu key de Supabase]

Click "Add" para cada una
```

### 3.3 Deployar
```
1. Click "Deploy"
2. ⏳ Espera 1-2 minutos
3. ✅ Cuando veas "Congratulations", estás listo
4. Copy the URL (algo como https://english-coffee-time-educational.vercel.app)
```

**TIEMPO:** 15 min

---

## ✅ VERIFICACIÓN FINAL (10 minutos)

### Prueba tu sitio:

```
1. Abre: https://english-coffee-time-educational.vercel.app

2. Click "Registrarse"
   - Selecciona "Estudiante"
   - Nombre: Test User
   - Email: test@example.com
   - Password: Test123456
   - Click "Crear Cuenta"

3. Deberías ir al Test Inicial (30 preguntas)

4. Después del test, deberías ver Dashboard con tu nivel

5. Click en módulo A1 Reading
   - Responde preguntas
   - Finaliza
   - Ve resultado

6. Vuelve al Dashboard
   - Deberías ver "A1 Reading: 85% ✅"
```

Si TODO funciona → **¡ESTÁS EN VIVO!** 🎉

---

## 🔗 COMPARTIR TU SITIO

Tu URL es: `https://english-coffee-time-educational.vercel.app`

Puedes:
- Compartir en redes sociales
- Mandar a amigos
- Comenzar a agregar estudiantes/profesores
- Crear grupos en el panel de profesor

---

## 🆘 TROUBLESHOOTING

### Si ves error "Cannot read properties"
→ Vercel está esperando que completes las variables de entorno
→ Ve a Vercel Settings > Environment Variables
→ Asegúrate que VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY estén ahí
→ Re-deploy

### Si el test no carga preguntas
→ Las preguntas están hardcodeadas en initial-test.html por ahora
→ En Fase 2 se conectarán a Supabase

### Si registro no funciona
→ Por ahora usa localStorage (funciona localmente)
→ En Fase 2 se conectará a Supabase Auth

---

## 📊 PRÓXIMOS PASOS (DESPUÉS DE DEPLOY)

**SEMANA 2:**
- Integrar Supabase Auth real
- Conectar registro/login a BD
- Cargar preguntas desde Supabase
- Guardar progreso en BD

**SEMANA 3:**
- Certificados PDF descargables
- Reportes para profesores
- Export CSV/Excel

**SEMANA 4:**
- Gamificación (badges, rankings)
- Email automático
- Mejoras UI/UX

---

## ✨ CHECKLIST FINAL

Antes de "Lanzar Oficialmente":

- [ ] Sitio en vivo en Vercel
- [ ] Test inicial funciona
- [ ] Dashboard estudiante funciona
- [ ] Panel profesor funciona
- [ ] Supabase creado y SQL ejecutado
- [ ] Variables de entorno en Vercel
- [ ] Testear en diferentes navegadores
- [ ] Testear en móvil
- [ ] Compartir link con algunos amigos
- [ ] Recopilar feedback

---

## 🎉 ¡LISTO PARA LANZAR!

**Tiempo total:** ~50 minutos (si todo va bien)

**Tu plataforma educativa está en vivo.** 

Ahora puedes:
- Invitar estudiantes
- Crear grupos de profesores
- Comenzar a tracking de progreso
- Expandir con más módulos

**¡Felicidades! 🎓**

---

**Documentación completa:** README.md
**Setup de BD:** DATABASE_SETUP.md
**Questions?** info@englishcoffeetime.com
