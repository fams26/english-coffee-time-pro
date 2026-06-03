# 📥 PASO 2: CARGAR 235+ TEMAS DESDE JSON

Ahora vamos a cargar los 235+ temas, recursos y preguntas en la base de datos.

---

## 🎯 OPCIONES DE CARGA

### **OPCIÓN A: Script Python (RECOMENDADO - Más rápido)**
```bash
Tiempo: 30 min - 2 horas
Ventaja: Automatizado y confiable
```

### **OPCIÓN B: SQL Manual**
```bash
Tiempo: 4-6 horas
Ventaja: Más control, sin dependencias
```

### **OPCIÓN C: Importar desde UI Supabase**
```bash
Tiempo: 2-3 horas
Ventaja: Visual y fácil
```

---

## ✅ OPCIÓN A: SCRIPT PYTHON (RECOMENDADO)

### **PASO A1: Instalar dependencias**

```bash
pip install supabase
```

### **PASO A2: Preparar archivos**

Necesitas en la misma carpeta:
```
load_modules_from_json.py      (el script)
english-coffee-time-modules-FASE2.json  (los temas)
```

### **PASO A3: Ejecutar script**

```bash
# Desde la carpeta donde están los archivos:
python3 load_modules_from_json.py
```

### **PASO A4: Ver progreso**

El script mostrará:
```
🚀 CARGANDO MÓDULOS A SUPABASE
📖 Cargando JSON...
✅ JSON cargado: 235 temas
📝 Insertando temas...
📝 10/235 temas procesados (10 insertados)
📝 20/235 temas procesados (20 insertados)
...
✅ Insertados: 235 temas
❌ Errores: 0
✅ Temas: 235
✅ Recursos: 940
✅ Preguntas: 940
✨ ¡CARGA COMPLETADA!
```

---

## 🔧 OPCIÓN B: SQL MANUAL

Si prefieres hacer inserts manual con SQL, voy a generar un archivo SQL grande con todos los inserts.

### **PASO B1: Generar SQL**

Puedo crear un archivo `FASE2_INSERT_ALL_TOPICS.sql` con:
- 235+ INSERT INTO module_topics
- 940+ INSERT INTO topic_resources  
- 940+ INSERT INTO questions

(Será un archivo muy grande, ~5MB+)

### **PASO B2: Ejecutar en Supabase**

```bash
1. Descarga: FASE2_INSERT_ALL_TOPICS.sql
2. Abre Supabase → SQL Editor
3. Copia y pega TODO
4. Click "Run"
⏳ Espera 15-30 min (es MUCHO código)
```

---

## 📱 OPCIÓN C: IMPORTAR DESDE UI

### **PASO C1: Convertir JSON a CSV**

```bash
# Crear CSV desde JSON (necesita script adicional)
python3 json_to_csv.py
```

### **PASO C2: Importar en Supabase**

```bash
1. Supabase → Data Editor
2. Table: module_topics
3. Import Data
4. Selecciona CSV
5. Mapea columnas
6. Click Import
```

(Esto es MÁS lento que el script Python)

---

## 🎯 RECOMENDACIÓN

**Usa OPCIÓN A (Script Python)** porque:
- ✅ Más rápido (30 min - 2 horas)
- ✅ Maneja errores automáticamente
- ✅ Verifica datos al final
- ✅ Muestra progreso
- ✅ Menos propenso a errores

---

## 🚀 CÓMO EJECUTAR (PASO A PASO)

### **En tu computadora:**

```bash
# 1. Abre Terminal/CMD

# 2. Instala Supabase
pip install supabase

# 3. Descarga los archivos:
#    - load_modules_from_json.py
#    - english-coffee-time-modules-FASE2.json

# 4. Ve a la carpeta donde están los archivos
cd /ruta/a/la/carpeta

# 5. Ejecuta el script
python3 load_modules_from_json.py

# 6. Espera a que termine
# 7. Verifica el resultado
```

---

## ✅ VERIFICACIÓN POST-CARGA

Una vez que termine el script, verifica en Supabase:

### **Query 1: Ver temas por nivel**
```sql
SELECT nivel, module_type, COUNT(*) as total
FROM module_topics mt
JOIN modules m ON m.id = mt.module_id
GROUP BY nivel, module_type
ORDER BY nivel, module_type;
```

Debería mostrar:
```
nivel | module_type | total
------|-------------|-------
A1    | grammar     | 6
A1    | listening   | 4
A1    | reading     | 5
A1    | speaking    | 2
A1    | vocabulary  | 5
A1    | writing     | 2
A2    | grammar     | 41
A2    | listening   | 4
...
```

### **Query 2: Ver todos los recursos**
```sql
SELECT COUNT(*) as total_recursos 
FROM topic_resources;
-- Resultado esperado: 940+
```

### **Query 3: Ver todas las preguntas**
```sql
SELECT COUNT(*) as total_preguntas 
FROM questions;
-- Resultado esperado: 940+
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### **Error: "module not found"**
```bash
# Asegúrate de instalar supabase:
pip install supabase
```

### **Error: "connection refused"**
```bash
# Verifica que:
1. Tienes internet
2. Las credenciales de Supabase son correctas
3. Tu proyecto Supabase está activo
```

### **Error: "JSON not found"**
```bash
# Asegúrate que el archivo está en la misma carpeta:
ls english-coffee-time-modules-FASE2.json
```

### **Script muy lento**
```bash
# Es normal, son 2000+ inserts
# Puede tomar 1-2 horas
# Déjalo correr en segundo plano
```

---

## 📊 ARCHIVOS PARA DESCARGAR

| Archivo | Descripción |
|---------|-------------|
| `load_modules_from_json.py` | Script Python de carga |
| `english-coffee-time-modules-FASE2.json` | Datos de 235+ temas |
| `FASE2_INSERT_ALL_TOPICS.sql` | (Opcional) SQL gigante con todos los inserts |

---

## 🎯 PRÓXIMO PASO

Una vez que los temas estén cargados:

→ **PASO 3: Crear Dashboard de Módulos**
- Archivo: `app/modules-dashboard.html`
- Funciones: `js/modules-functions.js`

---

## ⏱️ TIMELINE ESTIMADO

| Paso | Tiempo | Estado |
|------|--------|--------|
| PASO 1: BD | 15 min | ✅ COMPLETO |
| **PASO 2: Cargar temas** | **30 min - 2h** | 🔲 AHORA |
| PASO 3: Dashboard | 2-3 h | ⏭️ Siguiente |
| PASO 4: Funciones JS | 2 h | ⏭️ Siguiente |
| PASO 5: Testing | 1 h | ⏭️ Siguiente |

---

## ✨ ¡LISTO PARA CARGAR!

**¿Cuál opción eliges?**

- **A (Python)** → Más rápido ⭐
- **B (SQL)** → Más control
- **C (UI)** → Más visual

Recomiendo **A** 👉 Descarga `load_modules_from_json.py` y ejecuta

