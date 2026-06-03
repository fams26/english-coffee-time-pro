# DEPLOYMENT & STRIPE SETUP - ENGLISH COFFEE TIME PRO MVP

## 📋 CHECKLIST PRE-DEPLOYMENT

- [ ] Todos los archivos creados
- [ ] Cuenta en Supabase creada
- [ ] Cuenta en Stripe creada (test mode)
- [ ] GitHub repositorio creado
- [ ] Vercel conectado a GitHub

---

## 🚀 PASO 1: SETUP GITHUB

```bash
# 1. Crear repositorio en GitHub
# Ve a: https://github.com/new
# Nombre: english-coffee-time-pro
# Descripción: "Commercial MVP - English learning platform"
# Público (para que Vercel pueda acceder)

# 2. En tu terminal, en la carpeta del proyecto:
cd /home/claude/english-coffee-time-pro

# Inicializar git
git init
git add .
git commit -m "Initial commit: English Coffee Time MVP - Landing, Auth, Dashboard"

# Agregar remote
git remote add origin https://github.com/TU_USUARIO/english-coffee-time-pro.git

# Push a main
git branch -M main
git push -u origin main
```

---

## 💳 PASO 2: SETUP STRIPE

### 2.1 Crear cuenta Stripe
1. Ve a: https://dashboard.stripe.com/register
2. Completa registro
3. Activa modo Test (superior derecha)

### 2.2 Obtener credenciales
1. Ve a: https://dashboard.stripe.com/apikeys
2. Copia:
   - **Publishable key** (comienza con `pk_test_`)
   - **Secret key** (comienza con `sk_test_`)

### 2.3 Crear productos en Stripe
```
Dashboard Stripe > Products

PRODUCTO 1: Premium Mensual
├─ Name: Premium Monthly
├─ Price: $9.99/month
├─ Billing: Monthly
├─ ID: price_1234567890 (cópialo)

PRODUCTO 2: Premium Anual
├─ Name: Premium Annual
├─ Price: $79.99/year
├─ Billing: Yearly
├─ ID: price_0987654321 (cópialo)
```

---

## 🔧 PASO 3: SETUP SUPABASE

### 3.1 Crear proyecto Supabase
1. Ve a: https://supabase.com
2. Sign up con GitHub
3. Crea nuevo proyecto:
   - **Name**: english-coffee-time
   - **Region**: Closest to you
   - **Password**: Strong password

### 3.2 Obtener credenciales
1. Ve a: Project Settings > API
2. Copia:
   - **Project URL** (comienza con `https://`)
   - **Anon Public Key**

### 3.3 Crear tablas
Copia este SQL en SQL Editor:

```sql
-- Usuarios
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  current_level VARCHAR(5) DEFAULT 'A1',
  average_score FLOAT DEFAULT 0,
  modules_completed INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  subscription_status VARCHAR(50) DEFAULT 'free'
);

-- Progreso por módulo
CREATE TABLE module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  level VARCHAR(5),
  module_type VARCHAR(50),
  score FLOAT,
  completed_at TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending'
);

-- Suscripciones
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  plan_type VARCHAR(50),
  status VARCHAR(50),
  started_at TIMESTAMP DEFAULT NOW(),
  ends_at TIMESTAMP
);
```

---

## 📁 PASO 4: CREAR ARCHIVO .ENV.LOCAL

Crea archivo `/home/claude/english-coffee-time-pro/.env.local`:

```
# SUPABASE
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# STRIPE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_1234567890
STRIPE_SECRET_KEY=sk_test_1234567890

# APP
NEXT_PUBLIC_APP_URL=https://english-coffee-time-pro.vercel.app
```

**NO COMMITEAR ESTE ARCHIVO A GIT**

---

## ⚡ PASO 5: ACTUALIZAR HTML CON CREDENCIALES

En `signup.html` y `signin.html`, reemplaza:

```javascript
// ANTES:
const SUPABASE_URL = 'https://YOUR-PROJECT.supabase.co';
const SUPABASE_KEY = 'YOUR-ANON-KEY';

// DESPUÉS:
const SUPABASE_URL = 'https://your-real-project.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

---

## 🌐 PASO 6: DEPLOY A VERCEL

### 6.1 Conectar a Vercel
1. Ve a: https://vercel.com
2. Sign up con GitHub
3. Click "Import Project"
4. Selecciona repositorio `english-coffee-time-pro`

### 6.2 Configurar variables de entorno
En Vercel > Project Settings > Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_test_1234567890
STRIPE_SECRET_KEY = sk_test_1234567890
```

### 6.3 Deploy
Click "Deploy" y espera ~2-3 minutos

Tu sitio estará en: `https://english-coffee-time-pro.vercel.app`

---

## ✅ PASO 7: TEST LA PLATAFORMA

### Links de prueba:

1. **Landing Page**
   https://english-coffee-time-pro.vercel.app/landing.html

2. **Sign Up**
   https://english-coffee-time-pro.vercel.app/signup.html

3. **Sign In**
   https://english-coffee-time-pro.vercel.app/signin.html

4. **Dashboard (después de login)**
   https://english-coffee-time-pro.vercel.app/app/dashboard.html

### Test de pago con Stripe (test mode)
- Email: cualquier email
- Card: `4242 4242 4242 4242`
- Expiry: `12/25`
- CVC: `123`

---

## 📊 MÉTRICAS A RASTREAR

Instala en landing.html:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXXXX');
</script>

<!-- Plausible Analytics (privacidad primero) -->
<script defer data-domain="english-coffee-time-pro.vercel.app" src="https://plausible.io/js/script.js"></script>
```

---

## 🔗 PRÓXIMOS PASOS (SEMANA 2+)

### Semana 2:
- [ ] Integrar Supabase Auth completamente
- [ ] Crear módulos de test reales (A1 Reading, Grammar, etc.)
- [ ] Implementar sistema de puntuación
- [ ] Generar certificados PDF

### Semana 3:
- [ ] Integrar pagos Stripe (webhook)
- [ ] Sistema de trial 7 días
- [ ] Email de confirmación
- [ ] Dashboard de profesor

### Semana 4:
- [ ] Marketing landing optimizado
- [ ] Primeros anuncios pagos
- [ ] SEO básico
- [ ] Lanzamiento oficial

---

## 🎯 LINKS ÚTILES

- **Supabase Docs**: https://supabase.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **GitHub**: https://github.com

---

## 💬 SOPORTE

Si tienes problemas:

1. **Error de CORS**: Agrega dominio en Supabase > Project Settings > Auth > Redirect URLs
2. **Stripe no funciona**: Verifica que estés en modo Test
3. **Vercel 404**: Asegúrate que los archivos estén en GitHub

---

## 📅 TIMELINE RESUMIDO

**Hoy (Día 1):**
- Setup GitHub + Stripe + Supabase
- Deploy a Vercel
- Test básico

**Mañana (Día 2-3):**
- Crear tests funcionales
- Sistema de puntuación
- Certificados

**Día 4-5:**
- Integración pagos
- Email marketing
- Landing optimizado

**Día 6-7:**
- Marketing launch
- Ajustes finales
- LANZAMIENTO 🚀

---

**¿LISTO? Cuéntame cuando hayas completado los pasos 1-3 y te ayudaré con el resto.**
