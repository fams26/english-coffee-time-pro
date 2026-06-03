# 🎓 English Coffee Time - MVP Comercial

**Plataforma SaaS de evaluación y aprendizaje de inglés basada en MCER**

---

## 🎯 Visión General

Sistema comercial (modelo freemium) que permite a estudiantes:
- ✅ Evaluar su nivel de inglés (A1-C2)
- ✅ Acceder a 36 módulos (6 niveles × 6 habilidades)
- ✅ Obtener certificados descargables
- ✅ Seguir plan personalizado
- ✅ Progresar pagando $9.99/mes o $79.99/año

---

## 📊 Modelo de Negocio

### Planes de Precios
```
GRATUITO: Nivel A1 completo
├─ 6 módulos A1
├─ Certificado A1
└─ Sin acceso B1-C2

PREMIUM MENSUAL: $9.99/mes
├─ 36 módulos (6 niveles × 6 módulos)
├─ 3000+ preguntas
├─ Certificados todos los niveles
└─ Plan personalizado

PREMIUM ANUAL: $79.99/año (33% descuento)
└─ TODO + acceso de por vida
```

---

## 📁 Estructura del Proyecto

```
english-coffee-time-pro/
├── landing.html              # Landing page (conversión)
├── signup.html               # Registro
├── signin.html               # Login
├── DEPLOYMENT_GUIDE.md       # Guía de deploy
├── README.md                 # Este archivo
│
├── app/
│   ├── dashboard.html        # Dashboard principal (6 niveles)
│   ├── test.html             # Interface de tests
│   └── profile.html          # Perfil usuario
│
├── data/
│   └── questions.json        # Banco de preguntas (600+)
│
├── css/
│   ├── main.css
│   └── responsive.css
│
└── js/
    ├── auth.js               # Autenticación
    ├── stripe.js             # Pagos
    ├── test.js               # Lógica tests
    └── api.js                # Llamadas API
```

---

## 🚀 Quick Start

### 1. Clonar el proyecto
```bash
git clone https://github.com/TU_USUARIO/english-coffee-time-pro.git
cd english-coffee-time-pro
```

### 2. Crear cuentas necesarias
- [ ] GitHub: https://github.com/signup
- [ ] Supabase: https://supabase.com
- [ ] Stripe: https://stripe.com
- [ ] Vercel: https://vercel.com

### 3. Seguir DEPLOYMENT_GUIDE.md
Ver instrucciones detalladas en `DEPLOYMENT_GUIDE.md`

### 4. Deploy
```bash
# Push a GitHub
git push

# Vercel hace deploy automático
# Tu sitio en: https://english-coffee-time-pro.vercel.app
```

---

## 📚 Banco de Preguntas

### Distribución actual (MVP)
- **A1**: 70 preguntas (6 módulos × ~12 preguntas)
- **A2**: 60 preguntas (6 módulos)
- **B1**: 60 preguntas (6 módulos)
- **B2**: 60 preguntas (6 módulos)
- **C1**: 60 preguntas (6 módulos)
- **C2**: 60 preguntas (6 módulos)

**Total MVP: ~370 preguntas**

### Para producción (opcional):
- Aumentar a 3000+ preguntas
- Importar desde Excel `Banco_Preguntas_Ingles_2000.xlsx`
- Agregar videos y audios

---

## 🔧 Tecnología

### Frontend
- **HTML5 / CSS3 / Vanilla JavaScript**
- **Responsive Design** (Mobile-first)
- **Vercel** para hosting

### Backend
- **Supabase** (PostgreSQL)
- **Stripe** para pagos
- **SendGrid** para emails (opcional)

### Analítica
- **Google Analytics**
- **Plausible Analytics** (privacy-first)

---

## 💰 Proyecciones (Año 1)

```
MES 1:     50 usuarios → $50 ingresos
MES 3:    500 usuarios → $750 ingresos
MES 6:   2000 usuarios → $3,600 ingresos
MES 12:  5000 usuarios → $15,000+ ingresos/mes
```

**Costo infraestructura: $50-100/mes**

---

## 📅 Timeline de Desarrollo

| Fase | Semana | Focus | Deliverables |
|------|--------|-------|--------------|
| MVP | 1 | Setup + Landing | Sitio básico funcional |
| Tests | 2 | Tests funcionales | Módulos A1-B2 completos |
| Pagos | 3 | Integración Stripe | Sistema trial + suscripción |
| Marketing | 4 | Lanzamiento | Primeras conversiones |

---

## 🎯 KPIs a Rastrear

```
Adquisición:
├─ CAC (Customer Acquisition Cost) < $2
├─ Conversion rate > 10%
└─ Traffic sources

Retención:
├─ Churn rate < 5%
├─ LTV (Lifetime Value) > $100
└─ Monthly active users

Monetización:
├─ MRR (Monthly Recurring Revenue)
├─ ARR (Annual Recurring Revenue)
└─ ARPU (Average Revenue Per User)
```

---

## 🔐 Seguridad

- ✅ HTTPS/SSL (incluido en Vercel)
- ✅ Autenticación Supabase
- ✅ Variables de entorno protegidas
- ✅ No almacenar tarjetas (Stripe PCI compliant)
- ✅ GDPR compliant

---

## 📱 Características Principales

### Fase 1 (MVP - Esta semana)
- [x] Landing page profesional
- [x] Autenticación básica
- [x] Dashboard con 6 niveles
- [x] Banco de preguntas JSON
- [x] Sistema de puntuación
- [ ] Certificados PDF (próximo)

### Fase 2 (Semana 2-3)
- [ ] Tests funcionales completos
- [ ] Integración Stripe (pagos)
- [ ] Trial 7 días automático
- [ ] Email de confirmación
- [ ] Certificados descargables

### Fase 3 (Semana 4+)
- [ ] Chat de comunidad
- [ ] Flashcards + Spaced Repetition
- [ ] Análisis avanzado
- [ ] Tutor virtual (IA)
- [ ] App móvil PWA

---

## 🚀 Próximos Pasos

### HOY
1. ✅ Crear archivos (HECHO)
2. ⏭️ Crear GitHub repo
3. ⏭️ Setup Supabase
4. ⏭️ Setup Stripe
5. ⏭️ Deploy a Vercel

### MAÑANA
1. ⏭️ Crear tests funcionales
2. ⏭️ Integrar Supabase Auth
3. ⏭️ Sistema de puntuación real

### PRÓXIMA SEMANA
1. ⏭️ Pagos con Stripe
2. ⏭️ Certificados PDF
3. ⏭️ Landing optimizado
4. ⏭️ Primeros anuncios
5. ⏭️ LANZAMIENTO 🚀

---

## 📞 Soporte

- **Documentación**: Ver `DEPLOYMENT_GUIDE.md`
- **Issues**: GitHub Issues
- **Email**: info@englishcoffeetime.com

---

## 📄 Licencia

Propietario - English Coffee Time 2025

---

## 🎉 Ready to Launch?

Sigue los pasos en `DEPLOYMENT_GUIDE.md` para tener tu MVP en vivo en menos de 1 hora.

**¡Vamos a hacer esto! 🚀**
