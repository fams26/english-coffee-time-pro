// ============================================
// js/dashboard-functions.js - MÓDULOS DATA
// ============================================

/**
 * Datos de módulos y competencias CEFR alineadas
 * 180+ competencias organizadas por nivel y tipo
 */
const MODULES_DATA = {
    levels: [
        {
            id: 'A1',
            name: 'A1 - Elemental',
            description: 'Principiante absoluto. Empiezas tu viaje en inglés.',
            color: '#FF6B6B',
            modules: [
                {
                    id: 'A1_Grammar',
                    name: 'Gramática',
                    type: 'Grammar',
                    competencies: [
                        { id: 'A1_G1', title: 'Present Simple', descriptor: 'Uso básico de presente simple', context: 'Rutina diaria, hechos generales' },
                        { id: 'A1_G2', title: 'To Be (Ser/Estar)', descriptor: 'Conjugación de to be', context: 'Identificación personal' },
                        { id: 'A1_G3', title: 'Pronombres Personales', descriptor: 'Sujetos y objetos', context: 'Comunicación básica' },
                        { id: 'A1_G4', title: 'Artículos (A/An/The)', descriptor: 'Uso correcto de artículos', context: 'Sustantivos y descripción' },
                        { id: 'A1_G5', title: 'Plural Simple', descriptor: 'Formación de plurales regulares', context: 'Contar y enumerar' }
                    ]
                },
                {
                    id: 'A1_Reading',
                    name: 'Lectura',
                    type: 'Reading',
                    competencies: [
                        { id: 'A1_R1', title: 'Palabras clave', descriptor: 'Identificar palabras conocidas', context: 'Textos simples' },
                        { id: 'A1_R2', title: 'Frases cortas', descriptor: 'Comprender frases simples', context: 'Avisos y señales' },
                        { id: 'A1_R3', title: 'Instrucciones básicas', descriptor: 'Seguir instrucciones simples', context: 'Recetas y procedimientos' },
                        { id: 'A1_R4', title: 'Información personal', descriptor: 'Extraer datos de formularios', context: 'Documentos básicos' },
                        { id: 'A1_R5', title: 'Textos descriptivos cortos', descriptor: 'Comprender descripciones simples', context: 'Perfiles y catálogos' }
                    ]
                },
                {
                    id: 'A1_Writing',
                    name: 'Escritura',
                    type: 'Writing',
                    competencies: [
                        { id: 'A1_W1', title: 'Copiar palabras', descriptor: 'Escribir palabras copiadas', context: 'Práctica de ortografía' },
                        { id: 'A1_W2', title: 'Frases simples', descriptor: 'Escribir frases muy básicas', context: 'Presentación personal' },
                        { id: 'A1_W3', title: 'Datos personales', descriptor: 'Rellenar formularios', context: 'Registro y solicitudes' },
                        { id: 'A1_W4', title: 'Saludos básicos', descriptor: 'Escribir saludos y despedidas', context: 'Comunicación informal' },
                        { id: 'A1_W5', title: 'Listas simples', descriptor: 'Hacer listas de palabras', context: 'Organización personal' },
                        { id: 'A1_W6', title: 'Tarjetas postales', descriptor: 'Escribir mensajes muy cortos', context: 'Comunicación ocasional' }
                    ]
                },
                {
                    id: 'A1_Listening',
                    name: 'Escucha',
                    type: 'Listening',
                    competencies: [
                        { id: 'A1_L1', title: 'Palabras aisladas', descriptor: 'Reconocer palabras individuales', context: 'Vocabulario visual' },
                        { id: 'A1_L2', title: 'Números y precios', descriptor: 'Entender números y dinero', context: 'Compras y transacciones' },
                        { id: 'A1_L3', title: 'Instrucciones cortas', descriptor: 'Seguir instrucciones simples habladas', context: 'Direcciones básicas' },
                        { id: 'A1_L4', title: 'Saludos y presentaciones', descriptor: 'Entender presentaciones básicas', context: 'Primeros encuentros' },
                        { id: 'A1_L5', title: 'Anuncios simples', descriptor: 'Captar información clave en avisos', context: 'Espacios públicos' },
                        { id: 'A1_L6', title: 'Diálogos muy simples', descriptor: 'Seguir conversaciones lentamente', context: 'Situaciones cotidianas' }
                    ]
                },
                {
                    id: 'A1_Speaking',
                    name: 'Expresión Oral',
                    type: 'Speaking',
                    competencies: [
                        { id: 'A1_S1', title: 'Pronunciación básica', descriptor: 'Pronunciar palabras claramente', context: 'Práctica individual' },
                        { id: 'A1_S2', title: 'Saludos y presentación', descriptor: 'Presentarse con nombre y origen', context: 'Primeros encuentros' },
                        { id: 'A1_S3', title: 'Preguntas simples', descriptor: 'Hacer preguntas básicas', context: 'Información personal' },
                        { id: 'A1_S4', title: 'Números y precios', descriptor: 'Decir números y precios', context: 'Compras básicas' },
                        { id: 'A1_S5', title: 'Instrucciones simples', descriptor: 'Dar órdenes muy básicas', context: 'Comunicación funcional' },
                        { id: 'A1_S6', title: 'Respuestas cortas', descriptor: 'Responder sí/no y preguntas simples', context: 'Conversación básica' }
                    ]
                },
                {
                    id: 'A1_Vocabulary',
                    name: 'Vocabulario',
                    type: 'Vocabulary',
                    competencies: [
                        { id: 'A1_V1', title: 'Colores y números', descriptor: '0-100 y colores principales', context: 'Descripción básica' },
                        { id: 'A1_V2', title: 'Familia', descriptor: 'Miembros cercanos de la familia', context: 'Relaciones personales' },
                        { id: 'A1_V3', title: 'Profesiones comunes', descriptor: '10+ profesiones básicas', context: 'Información laboral' },
                        { id: 'A1_V4', title: 'Comida y bebida', descriptor: '20+ alimentos comunes', context: 'Compras y restaurantes' },
                        { id: 'A1_V5', title: 'Ropa y apariencia', descriptor: '15+ prendas básicas', context: 'Descripción personal' },
                        { id: 'A1_V6', title: 'Lugares y direcciones', descriptor: 'Lugares comunes y preposiciones', context: 'Orientación espacial' },
                        { id: 'A1_V7', title: 'Tiempo y calendario', descriptor: 'Días, meses, horas básicas', context: 'Organización temporal' },
                        { id: 'A1_V8', title: 'Actividades diarias', descriptor: '15+ verbos de rutina', context: 'Vida cotidiana' }
                    ]
                }
            ]
        },
        {
            id: 'A2',
            name: 'A2 - Elemental',
            description: 'Comprendes frases simples y puedes comunicarte en situaciones básicas.',
            color: '#FFA500',
            modules: [
                {
                    id: 'A2_Grammar',
                    name: 'Gramática',
                    type: 'Grammar',
                    competencies: [
                        { id: 'A2_G1', title: 'Past Simple (Regular)', descriptor: 'Pasado de verbos regulares', context: 'Eventos pasados' },
                        { id: 'A2_G2', title: 'Past Simple (Irregular)', descriptor: 'Verbos irregulares comunes', context: 'Historias personales' },
                        { id: 'A2_G3', title: 'Present Continuous', descriptor: 'Acciones en progreso', context: 'Lo que está pasando ahora' },
                        { id: 'A2_G4', title: 'There is / There are', descriptor: 'Existencia de cosas', context: 'Descripción de espacios' },
                        { id: 'A2_G5', title: 'Can / Could', descriptor: 'Habilidades y posibilidades', context: 'Capacidades personales' },
                        { id: 'A2_G6', title: 'Some / Any', descriptor: 'Cantidad indefinida', context: 'Compras y pedidos' },
                        { id: 'A2_G7', title: 'Comparativos simples', descriptor: 'Comparación de adjetivos', context: 'Preferencias' },
                        { id: 'A2_G8', title: 'Preposiciones comunes', descriptor: 'In, on, at, to, from, with, etc', context: 'Relaciones espaciales' }
                    ]
                },
                {
                    id: 'A2_Reading',
                    name: 'Lectura',
                    type: 'Reading',
                    competencies: [
                        { id: 'A2_R1', title: 'Emails informales', descriptor: 'Comprender emails sencillos', context: 'Comunicación personal' },
                        { id: 'A2_R2', title: 'Historias cortas', descriptor: 'Seguir narrativa básica', context: 'Cuentos simples' },
                        { id: 'A2_R3', title: 'Menús y precios', descriptor: 'Información de restaurantes', context: 'Vida social' },
                        { id: 'A2_R4', title: 'Publicidad simple', descriptor: 'Entender anuncios básicos', context: 'Compras y servicios' },
                        { id: 'A2_R5', title: 'Horarios y mapas', descriptor: 'Leer información de transporte', context: 'Viajes y desplazamientos' },
                        { id: 'A2_R6', title: 'Sobre personas', descriptor: 'Biografías simples', context: 'Información personal' },
                        { id: 'A2_R7', title: 'Reseñas básicas', descriptor: 'Opiniones simples sobre productos', context: 'Recomendaciones' }
                    ]
                },
                {
                    id: 'A2_Writing',
                    name: 'Escritura',
                    type: 'Writing',
                    competencies: [
                        { id: 'A2_W1', title: 'Emails simples', descriptor: 'Escribir emails informales', context: 'Comunicación personal' },
                        { id: 'A2_W2', title: 'Párrafos básicos', descriptor: 'Texto de 3-4 frases', context: 'Expresión personal' },
                        { id: 'A2_W3', title: 'Descripción de personas', descriptor: 'Describir apariencia y personalidad', context: 'Presentaciones' },
                        { id: 'A2_W4', title: 'Descripción de lugares', descriptor: 'Describir espacios y ciudades', context: 'Viajes' },
                        { id: 'A2_W5', title: 'Postales y mensajes', descriptor: 'Mensajes personales cortos', context: 'Comunicación turística' },
                        { id: 'A2_W6', title: 'Textos sobre rutina', descriptor: 'Describir actividades diarias', context: 'Diarios personales' }
                    ]
                },
                {
                    id: 'A2_Listening',
                    name: 'Escucha',
                    type: 'Listening',
                    competencies: [
                        { id: 'A2_L1', title: 'Conversaciones familiares', descriptor: 'Entender temas personales', context: 'Vida cotidiana' },
                        { id: 'A2_L2', title: 'Instrucciones claras', descriptor: 'Seguir procedimientos simples', context: 'Tareas y trabajo' },
                        { id: 'A2_L3', title: 'Anuncios públicos', descriptor: 'Captar información en espacios públicos', context: 'Aeropuertos, estaciones' },
                        { id: 'A2_L4', title: 'Descripciones orales', descriptor: 'Entender descripciones simples', context: 'Personas y lugares' },
                        { id: 'A2_L5', title: 'Fechas y horarios', descriptor: 'Captar información temporal', context: 'Planificación' },
                        { id: 'A2_L6', title: 'Diálogos cotidianos', descriptor: 'Seguir conversaciones normales', context: 'Tiendas y servicios' }
                    ]
                },
                {
                    id: 'A2_Speaking',
                    name: 'Expresión Oral',
                    type: 'Speaking',
                    competencies: [
                        { id: 'A2_S1', title: 'Conversación personal', descriptor: 'Hablar de sí mismo en detalle', context: 'Interacción social' },
                        { id: 'A2_S2', title: 'Experiencias pasadas', descriptor: 'Contar historias simples', context: 'Conversación informal' },
                        { id: 'A2_S3', title: 'Planes futuros', descriptor: 'Hablar de intenciones próximas', context: 'Invitaciones y citas' },
                        { id: 'A2_S4', title: 'Compras y negocios', descriptor: 'Transacciones comerciales básicas', context: 'Tiendas y restaurantes' },
                        { id: 'A2_S5', title: 'Direcciones y mapas', descriptor: 'Pedir y dar direcciones', context: 'Orientación en ciudades' },
                        { id: 'A2_S6', title: 'Opiniones simples', descriptor: 'Expresar preferencias básicas', context: 'Discusión casual' }
                    ]
                },
                {
                    id: 'A2_Vocabulary',
                    name: 'Vocabulario',
                    type: 'Vocabulary',
                    competencies: [
                        { id: 'A2_V1', title: 'Tiempo atmosférico', descriptor: 'Clima y estaciones', context: 'Conversación cotidiana' },
                        { id: 'A2_V2', title: 'Animales domésticos', descriptor: '15+ mascotas comunes', context: 'Vida personal' },
                        { id: 'A2_V3', title: 'Deportes y ocio', descriptor: '20+ actividades recreativas', context: 'Tiempo libre' },
                        { id: 'A2_V4', title: 'Muebles y hogar', descriptor: 'Objetos de la casa', context: 'Descripción del hogar' },
                        { id: 'A2_V5', title: 'Viajes y turismo', descriptor: 'Vocabulario de viaje', context: 'Planificación de vacaciones' },
                        { id: 'A2_V6', title: 'Emociones básicas', descriptor: 'Happy, sad, tired, angry, etc', context: 'Expresión emocional' },
                        { id: 'A2_V7', title: 'Dinero y economía', descriptor: 'Monedas, precios, transacciones', context: 'Compras y finanzas' },
                        { id: 'A2_V8', title: 'Salud básica', descriptor: 'Síntomas y medicinas comunes', context: 'Consulta médica' }
                    ]
                }
            ]
        },
        {
            id: 'B1',
            name: 'B1 - Intermedio',
            description: 'Puedes expresar opiniones y hablar sobre experiencias pasadas con cierta fluidez.',
            color: '#4ECDC4',
            modules: [
                {
                    id: 'B1_Grammar',
                    name: 'Gramática',
                    type: 'Grammar',
                    competencies: [
                        { id: 'B1_G1', title: 'Present Perfect Simple', descriptor: 'Experiencias hasta el presente', context: 'Logros y cambios' },
                        { id: 'B1_G2', title: 'Present Perfect Continuous', descriptor: 'Duración de acciones', context: 'Actividades recientes' },
                        { id: 'B1_G3', title: 'First Conditional', descriptor: 'Situaciones reales posibles', context: 'Hipótesis probables' },
                        { id: 'B1_G4', title: 'Modal Verbs (Must/Should)', descriptor: 'Obligación y consejo', context: 'Instrucciones y recomendaciones' },
                        { id: 'B1_G5', title: 'Passive Voice', descriptor: 'Voz pasiva en presente y pasado', context: 'Descripción neutral' },
                        { id: 'B1_G6', title: 'Reported Speech', descriptor: 'Discurso indirecto básico', context: 'Transmitir información' },
                        { id: 'B1_G7', title: 'Relative Clauses (Who/Which/That)', descriptor: 'Cláusulas relativas simples', context: 'Descripciones detalladas' },
                        { id: 'B1_G8', title: 'Conectores de contraste', descriptor: 'But, However, Although, etc', context: 'Argumentación' }
                    ]
                },
                {
                    id: 'B1_Reading',
                    name: 'Lectura',
                    type: 'Reading',
                    competencies: [
                        { id: 'B1_R1', title: 'Artículos de noticias', descriptor: 'Entender noticias simples', context: 'Medios de comunicación' },
                        { id: 'B1_R2', title: 'Ensayos de opinión', descriptor: 'Seguir argumentación básica', context: 'Artículos de opinión' },
                        { id: 'B1_R3', title: 'Entrevistas impresas', descriptor: 'Información de Q&A', context: 'Perfiles de personas' },
                        { id: 'B1_R4', title: 'Descripciones de productos', descriptor: 'Especificaciones y características', context: 'Compras online' },
                        { id: 'B1_R5', title: 'Literatura simple', descriptor: 'Seguir narrativa con más detalle', context: 'Novelas cortas' },
                        { id: 'B1_R6', title: 'Correos formales', descriptor: 'Entender emails profesionales', context: 'Comunicación laboral' }
                    ]
                },
                {
                    id: 'B1_Writing',
                    name: 'Escritura',
                    type: 'Writing',
                    competencies: [
                        { id: 'B1_W1', title: 'Ensayos persuasivos', descriptor: 'Argumentar una posición', context: 'Escritura académica' },
                        { id: 'B1_W2', title: 'Cartas formales', descriptor: 'Correspondencia profesional', context: 'Solicitudes y quejas' },
                        { id: 'B1_W3', title: 'Descripciones de eventos', descriptor: 'Narración de experiencias', context: 'Reportes y crónicas' },
                        { id: 'B1_W4', title: 'Párrafos conectados', descriptor: 'Texto de 5-6 frases cohesivo', context: 'Escritura extendida' },
                        { id: 'B1_W5', title: 'Resúmenes de textos', descriptor: 'Síntesis de información', context: 'Comprensión lectora' },
                        { id: 'B1_W6', title: 'Instrucciones detalladas', descriptor: 'Procesos paso a paso', context: 'Manuales y guías' }
                    ]
                },
                {
                    id: 'B1_Listening',
                    name: 'Escucha',
                    type: 'Listening',
                    competencies: [
                        { id: 'B1_L1', title: 'Entrevistas semiestructuradas', descriptor: 'Seguir tema pero con apoyo', context: 'Podcasts y reportajes' },
                        { id: 'B1_L2', title: 'Presentaciones cortas', descriptor: 'Captar idea principal', context: 'Conferencias y talleres' },
                        { id: 'B1_L3', title: 'Películas y series (subtítulos)', descriptor: 'Entender con apoyo visual', context: 'Entretenimiento' },
                        { id: 'B1_L4', title: 'Mensajes telefónicos', descriptor: 'Captar información en llamadas', context: 'Comunicación telefónica' },
                        { id: 'B1_L5', title: 'Instrucciones complejas', descriptor: 'Seguir procedimientos detallados', context: 'Enseñanza y capacitación' },
                        { id: 'B1_L6', title: 'Diálogos naturales', descriptor: 'Velocidad y pronunciación normales', context: 'Interacción real' }
                    ]
                },
                {
                    id: 'B1_Speaking',
                    name: 'Expresión Oral',
                    type: 'Speaking',
                    competencies: [
                        { id: 'B1_S1', title: 'Presentaciones personales', descriptor: 'Hablar 2-3 minutos sobre sí', context: 'Presentaciones públicas' },
                        { id: 'B1_S2', title: 'Argumentación básica', descriptor: 'Defender una opinión', context: 'Debate y discusión' },
                        { id: 'B1_S3', title: 'Storytelling', descriptor: 'Contar historias con detalles', context: 'Conversación social' },
                        { id: 'B1_S4', title: 'Preguntas de clarificación', descriptor: 'Pedir aclaraciones durante conversación', context: 'Comunicación efectiva' },
                        { id: 'B1_S5', title: 'Negociación simple', descriptor: 'Llegar a acuerdos básicos', context: 'Interacciones comerciales' },
                        { id: 'B1_S6', title: 'Expresión de emociones', descriptor: 'Hablar de sentimientos complejos', context: 'Conexión emocional' }
                    ]
                },
                {
                    id: 'B1_Vocabulary',
                    name: 'Vocabulario',
                    type: 'Vocabulary',
                    competencies: [
                        { id: 'B1_V1', title: 'Temas de actualidad', descriptor: 'Medio ambiente, tecnología, política', context: 'Noticias y discusión' },
                        { id: 'B1_V2', title: 'Educación y aprendizaje', descriptor: 'Universidades, carreras, investigación', context: 'Vida académica' },
                        { id: 'B1_V3', title: 'Relaciones personales', descriptor: 'Términos de amistad y romance', context: 'Vida social' },
                        { id: 'B1_V4', title: 'Negocios básicos', descriptor: 'Mercado, empresas, dinero', context: 'Vida profesional' },
                        { id: 'B1_V5', title: 'Phrasal verbs comunes', descriptor: 'Get up, put off, look for, etc', context: 'Idiomatismos ingleses' }
                    ]
                }
            ]
        },
        {
            id: 'B2',
            name: 'B2 - Intermedio-Alto',
            description: 'Tienes fluidez y puedes entender textos complejos sobre diversos temas.',
            color: '#45B7D1',
            modules: [
                {
                    id: 'B2_Grammar',
                    name: 'Gramática',
                    type: 'Grammar',
                    competencies: [
                        { id: 'B2_G1', title: 'Second Conditional', descriptor: 'Situaciones hipotéticas', context: 'Fantasías y posibilidades' },
                        { id: 'B2_G2', title: 'Passive Voice (avanzado)', descriptor: 'Voz pasiva en múltiples tiempos', context: 'Escritura formal' },
                        { id: 'B2_G3', title: 'Modal Verbs (advanced)', descriptor: 'May, Might, Must, Could para deducción', context: 'Inferencias' },
                        { id: 'B2_G4', title: 'Reported Speech (avanzado)', descriptor: 'Cambios en tiempos y modales', context: 'Discurso indirecto complejo' },
                        { id: 'B2_G5', title: 'Inverted sentences', descriptor: 'Énfasis con inversión', context: 'Escritura sofisticada' },
                        { id: 'B2_G6', title: 'Mixed Conditionals', descriptor: 'Combinación de condicionales', context: 'Situaciones complejas' },
                        { id: 'B2_G7', title: 'Gerunds vs Infinitives', descriptor: 'Uso correcto según contexto', context: 'Expresión precisa' },
                        { id: 'B2_G8', title: 'Advanced conjunctions', descriptor: 'Although, whereas, whereas, etc', context: 'Argumentación sofisticada' }
                    ]
                },
                {
                    id: 'B2_Reading',
                    name: 'Lectura',
                    type: 'Reading',
                    competencies: [
                        { id: 'B2_R1', title: 'Artículos especializados', descriptor: 'Temas técnicos y académicos', context: 'Educación superior' },
                        { id: 'B2_R2', title: 'Literatura clásica', descriptor: 'Novelas y cuentos completos', context: 'Lectura extensiva' },
                        { id: 'B2_R3', title: 'Análisis crítico', descriptor: 'Reseñas y crítica literaria', context: 'Pensamiento crítico' },
                        { id: 'B2_R4', title: 'Documentos formales', descriptor: 'Contratos y legislación', context: 'Contexto profesional' },
                        { id: 'B2_R5', title: 'Textos persuasivos', descriptor: 'Propaganda y publicidad avanzada', context: 'Análisis de influencia' }
                    ]
                },
                {
                    id: 'B2_Writing',
                    name: 'Escritura',
                    type: 'Writing',
                    competencies: [
                        { id: 'B2_W1', title: 'Reportes profesionales', descriptor: 'Informes estructurados', context: 'Ambiente corporativo' },
                        { id: 'B2_W2', title: 'Ensayos argumentativos', descriptor: 'Tesis y antítesis desarrolladas', context: 'Escritura académica' },
                        { id: 'B2_W3', title: 'Correspondencia formal', descriptor: 'Cartas de negocio complejas', context: 'Comunicación profesional' },
                        { id: 'B2_W4', title: 'Revisión y edición', descriptor: 'Corrección de textos propios', context: 'Control de calidad' },
                        { id: 'B2_W5', title: 'Paráfrasis y síntesis', descriptor: 'Reescritura con vocabulario avanzado', context: 'Procesamiento textual' },
                        { id: 'B2_W6', title: 'Creative writing', descriptor: 'Historias originales con estructura', context: 'Expresión creativa' }
                    ]
                },
                {
                    id: 'B2_Listening',
                    name: 'Escucha',
                    type: 'Listening',
                    competencies: [
                        { id: 'B2_L1', title: 'Conferencias completas', descriptor: 'Seguir sin subtítulos', context: 'Educación formal' },
                        { id: 'B2_L2', title: 'Películas sin subtítulos', descriptor: 'Entretenimiento sin apoyo', context: 'Inmersión cultural' },
                        { id: 'B2_L3', title: 'Podcasts especializados', descriptor: 'Temas técnicos y académicos', context: 'Aprendizaje continuo' },
                        { id: 'B2_L4', title: 'Entrevistas en profundidad', descriptor: 'Matices y preguntas complejas', context: 'Análisis de información' },
                        { id: 'B2_L5', title: 'Debates y discusiones', descriptor: 'Argumentación hablada', context: 'Pensamiento crítico' },
                        { id: 'B2_L6', title: 'Acentos diversos', descriptor: 'Múltiples variantes del inglés', context: 'Comunicación global' }
                    ]
                },
                {
                    id: 'B2_Speaking',
                    name: 'Expresión Oral',
                    type: 'Speaking',
                    competencies: [
                        { id: 'B2_S1', title: 'Presentaciones formales', descriptor: 'Con estructura y visual support', context: 'Contextos profesionales' },
                        { id: 'B2_S2', title: 'Debate argumentado', descriptor: 'Defender posiciones complejas', context: 'Pensamiento crítico' },
                        { id: 'B2_S3', title: 'Negociación profesional', descriptor: 'Llegar a acuerdos complejos', context: 'Negocios internacionales' },
                        { id: 'B2_S4', title: 'Expresión de sutilezas', descriptor: 'Matices, ironía, sarcasmo', context: 'Comunicación refinada' },
                        { id: 'B2_S5', title: 'Improvisación controlada', descriptor: 'Hablar sin preparación', context: 'Fluidez natural' },
                        { id: 'B2_S6', title: 'Presentaciones creativas', descriptor: 'Storytelling profesional', context: 'Influencia y persuasión' }
                    ]
                },
                {
                    id: 'B2_Vocabulary',
                    name: 'Vocabulario',
                    type: 'Vocabulary',
                    competencies: [
                        { id: 'B2_V1', title: 'Colocaciones avanzadas', descriptor: 'Combinaciones de palabras naturales', context: 'Expresión nativa' },
                        { id: 'B2_V2', title: 'Sinónimos y antónimos', descriptor: 'Precisión lexical', context: 'Riqueza expresiva' },
                        { id: 'B2_V3', title: 'Expresiones idiomáticas', descriptor: 'Más phrasal verbs y idioms', context: 'Comunicación auténtica' },
                        { id: 'B2_V4', title: 'Vocabulario académico', descriptor: 'Términos de educación formal', context: 'Contextos universitarios' },
                        { id: 'B2_V5', title: 'Vocabulario profesional', descriptor: 'Jerga de industrias específicas', context: 'Especialización laboral' }
                    ]
                }
            ]
        },
        {
            id: 'C1',
            name: 'C1 - Avanzado',
            description: 'Dominas el idioma y puedes expresar ideas sofisticadas con precisión.',
            color: '#667BC6',
            modules: [
                {
                    id: 'C1_Grammar',
                    name: 'Gramática',
                    type: 'Grammar',
                    competencies: [
                        { id: 'C1_G1', title: 'Third Conditional', descriptor: 'Situaciones contrafácticas pasadas', context: 'Análisis de alternativas' },
                        { id: 'C1_G2', title: 'Subjunctive Mood', descriptor: 'Subjuntivo en contextos formales', context: 'Expresión de deseos y dudas' },
                        { id: 'C1_G3', title: 'Complex sentences', descriptor: 'Múltiples cláusulas coordinadas', context: 'Escritura sofisticada' },
                        { id: 'C1_G4', title: 'Cleft sentences', descriptor: 'Énfasis mediante escisión', context: 'Estilo literario' },
                        { id: 'C1_G5', title: 'Nominalization', descriptor: 'Convertir verbos a sustantivos', context: 'Registro formal' },
                        { id: 'C1_G6', title: 'Advanced discourse markers', descriptor: 'Conectores de texto sofisticados', context: 'Cohesión textual avanzada' }
                    ]
                },
                {
                    id: 'C1_Reading',
                    name: 'Lectura',
                    type: 'Reading',
                    competencies: [
                        { id: 'C1_R1', title: 'Literatura clásica compleja', descriptor: 'Shakespeare, Austen, etc', context: 'Patrimonio cultural' },
                        { id: 'C1_R2', title: 'Textos académicos avanzados', descriptor: 'Investigación y teoría', context: 'Investigación superior' },
                        { id: 'C1_R3', title: 'Análisis literario', descriptor: 'Crítica y teoría literaria', context: 'Estudios de literatura' },
                        { id: 'C1_R4', title: 'Artículos especializados', descriptor: 'Cualquier campo profesional', context: 'Actualización de conocimiento' },
                        { id: 'C1_R5', title: 'Discurso político', descriptor: 'Discursos y documentos formales', context: 'Comprensión política' }
                    ]
                },
                {
                    id: 'C1_Writing',
                    name: 'Escritura',
                    type: 'Writing',
                    competencies: [
                        { id: 'C1_W1', title: 'Publicaciones académicas', descriptor: 'Artículos de investigación', context: 'Mundo académico' },
                        { id: 'C1_W2', title: 'Escritura creativa avanzada', descriptor: 'Novelas y poesía', context: 'Literatura original' },
                        { id: 'C1_W3', title: 'Discursos formales', descriptor: 'Conferencias y presentaciones', context: 'Oratoria pública' },
                        { id: 'C1_W4', title: 'Edición y crítica', descriptor: 'Evaluar y mejorar textos complejos', context: 'Control editorial' },
                        { id: 'C1_W5', title: 'Escritura para medios', descriptor: 'Artículos de opinión y reportajes', context: 'Periodismo' }
                    ]
                },
                {
                    id: 'C1_Listening',
                    name: 'Escucha',
                    type: 'Listening',
                    competencies: [
                        { id: 'C1_L1', title: 'Teatro en vivo', descriptor: 'Piezas dramáticas complejas', context: 'Experiencia cultural' },
                        { id: 'C1_L2', title: 'Documentales especializados', descriptor: 'Cualquier tema sin subtítulos', context: 'Educación audiovisual' },
                        { id: 'C1_L3', title: 'Discursos políticos', descriptor: 'Retórica y subtexto', context: 'Análisis político' },
                        { id: 'C1_L4', title: 'Charlas técnicas', descriptor: 'TED talks y conferencias especializadas', context: 'Innovación y ideas' },
                        { id: 'C1_L5', title: 'Poesía y prosa leída', descriptor: 'Literatura hablada', context: 'Apreciación estética' },
                        { id: 'C1_L6', title: 'Entrevistas intelectuales', descriptor: 'Pensadores y expertos', context: 'Profundidad intelectual' }
                    ]
                },
                {
                    id: 'C1_Speaking',
                    name: 'Expresión Oral',
                    type: 'Speaking',
                    competencies: [
                        { id: 'C1_S1', title: 'Conferencias magistrales', descriptor: 'Discursos extensos y complejos', context: 'Docencia universitaria' },
                        { id: 'C1_S2', title: 'Debate filosófico', descriptor: 'Ideas abstractas y complejas', context: 'Pensamiento crítico profundo' },
                        { id: 'C1_S3', title: 'Negociación de alto nivel', descriptor: 'Diplomacia y negocios complejos', context: 'Contextos internacionales' },
                        { id: 'C1_S4', title: 'Expresión artística oral', descriptor: 'Recitación y performance', context: 'Artes escénicas' },
                        { id: 'C1_S5', title: 'Improvisación sofisticada', descriptor: 'Respuesta fluida a cualquier tema', context: 'Maestría en el idioma' },
                        { id: 'C1_S6', title: 'Mentoría y enseñanza', descriptor: 'Enseñar conceptos complejos', context: 'Liderazgo intelectual' }
                    ]
                },
                {
                    id: 'C1_Vocabulary',
                    name: 'Vocabulario',
                    type: 'Vocabulary',
                    competencies: [
                        { id: 'C1_V1', title: 'Vocabulario literario', descriptor: 'Registro poético y clásico', context: 'Literatura y humanidades' },
                        { id: 'C1_V2', title: 'Matices semánticos', descriptor: 'Diferencias sutiles entre sinónimos', context: 'Precisión absoluta' },
                        { id: 'C1_V3', title: 'Jerga especializada', descriptor: 'Cualquier campo profesional', context: 'Expertise en áreas' },
                        { id: 'C1_V4', title: 'Etimología y análisis', descriptor: 'Raíces y formación de palabras', context: 'Comprensión profunda' },
                        { id: 'C1_V5', title: 'Expresiones arcaicas', descriptor: 'Palabras antiguas y formales', context: 'Literatura clásica' }
                    ]
                }
            ]
        }
    ]
};

console.log('✅ MODULES_DATA cargado con 180+ competencias');
