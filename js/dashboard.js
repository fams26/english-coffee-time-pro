// Datos de estudiantes (simulados - se conectarán a Google Drive)
const studentsData = [
    {
        id: 1,
        name: 'Juan García',
        email: 'juan@email.com',
        level: 'B1',
        score: 75,
        grammar: 78,
        vocab: 82,
        fluency: 72,
        comprehension: 75,
        date: '2025-05-15',
        strengths: ['Vocabulario variado', 'Comprensión de textos'],
        weaknesses: ['Pronunciación', 'Verbos complejos']
    },
    {
        id: 2,
        name: 'María López',
        email: 'maria@email.com',
        level: 'B2',
        score: 82,
        grammar: 85,
        vocab: 88,
        fluency: 78,
        comprehension: 82,
        date: '2025-05-14',
        strengths: ['Gramática avanzada', 'Expresión escrita'],
        weaknesses: ['Acento británico', 'Phrasal verbs']
    },
    {
        id: 3,
        name: 'Carlos Rodríguez',
        email: 'carlos@email.com',
        level: 'A2',
        score: 62,
        grammar: 65,
        vocab: 68,
        fluency: 58,
        comprehension: 62,
        date: '2025-05-13',
        strengths: ['Números y fechas', 'Saludos'],
        weaknesses: ['Tiempos verbales', 'Conversación']
    },
    {
        id: 4,
        name: 'Ana Martínez',
        email: 'ana@email.com',
        level: 'B1',
        score: 71,
        grammar: 72,
        vocab: 75,
        fluency: 68,
        comprehension: 70,
        date: '2025-05-12',
        strengths: ['Conversación casual', 'Vocabulario'],
        weaknesses: ['Escribir reportes', 'Presentaciones']
    },
    {
        id: 5,
        name: 'David Soto',
        email: 'david@email.com',
        level: 'C1',
        score: 88,
        grammar: 90,
        vocab: 92,
        fluency: 85,
        comprehension: 88,
        date: '2025-05-11',
        strengths: ['Expresión compleja', 'Análisis crítico'],
        weaknesses: ['Matices idiómaticos', 'Acentos regionales']
    },
    {
        id: 6,
        name: 'Sofia Hernández',
        email: 'sofia@email.com',
        level: 'A1',
        score: 55,
        grammar: 58,
        vocab: 60,
        fluency: 50,
        comprehension: 55,
        date: '2025-05-10',
        strengths: ['Motivación', 'Pronunciación básica'],
        weaknesses: ['Vocabulario', 'Tiempos verbales']
    },
    {
        id: 7,
        name: 'Pedro Díaz',
        email: 'pedro@email.com',
        level: 'B2',
        score: 80,
        grammar: 82,
        vocab: 85,
        fluency: 77,
        comprehension: 80,
        date: '2025-05-09',
        strengths: ['Escritura profesional', 'Lectura'],
        weaknesses: ['Escucha rápida', 'Debates']
    },
    {
        id: 8,
        name: 'Laura Gómez',
        email: 'laura@email.com',
        level: 'B1',
        score: 74,
        grammar: 76,
        vocab: 79,
        fluency: 70,
        comprehension: 73,
        date: '2025-05-08',
        strengths: ['Vocabulario técnico', 'Presentaciones'],
        weaknesses: ['Expresiones idiomáticas', 'Conversación rápida']
    }
];

// Temas por nivel
const topicsByLevel = {
    'A1': {
        'Vocabulario Básico': ['Números y colores', 'Familia y amigos', 'Comida y bebida', 'Ropa y accesorios'],
        'Gramática Elemental': ['Verbo to be', 'Presente simple', 'Plurales', 'Artículos a/an/the'],
        'Pronunciación': ['Vocales y consonantes', 'Ritmo del inglés', 'Entonación básica']
    },
    'A2': {
        'Vocabulario Intermedio': ['Lugares y direcciones', 'Trabajo y profesiones', 'Deportes y hobbies', 'Viajes'],
        'Gramática': ['Presente continuo', 'Pasado simple', 'Comparativos', 'Imperativos'],
        'Expresión': ['Describir personas', 'Hablar sobre experiencias pasadas', 'Hacer preguntas']
    },
    'B1': {
        'Vocabulario Avanzado': ['Negocios y finanzas', 'Tecnología', 'Medio ambiente', 'Cultura'],
        'Gramática': ['Verbos modales', 'Oraciones condicionales', 'Voz pasiva', 'Reported speech'],
        'Habilidades': ['Debates y argumentación', 'Escritura de correos formales', 'Presentaciones']
    },
    'B2': {
        'Vocabulario Profesional': ['Expresiones idiomáticas', 'Lenguaje académico', 'Matices semánticos'],
        'Gramática Avanzada': ['Estructuras inversas', 'Clásulas relativas complejas', 'Subjuntivos'],
        'Expresión Avanzada': ['Análisis de textos', 'Escritura académica', 'Debate profundo']
    },
    'C1': {
        'Vocabulario Sofisticado': ['Sinónimos y antónimos avanzados', 'Colocaciones complejas', 'Registro literario'],
        'Gramática Experta': ['Estructuras lingüísticas complejas', 'Matices gramaticales sutiles'],
        'Producción Experta': ['Redacción académica', 'Análisis crítico profundo', 'Expresión artística']
    },
    'C2': {
        'Dominio del Idioma': ['Lenguaje literario', 'Variantes regionales', 'Innovación lingüística'],
        'Escritura Experta': ['Novelas y ensayos', 'Crítica literaria', 'Discurso público'],
        'Maestría': ['Interpretación simultánea', 'Traducción profesional']
    }
};

let currentStudent = null;

// Inicialización
function initDashboard() {
    renderStudentsTable(studentsData);
    updateStats();
}

function renderStudentsTable(students) {
    const tbody = document.getElementById('studentsBody');
    tbody.innerHTML = students.map(student => `
        <tr onclick="viewStudent(${student.id})" style="cursor: pointer;">
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td><span class="level-badge level-${student.level.toLowerCase()}">${student.level}</span></td>
            <td>${student.score}%</td>
            <td>${new Date(student.date).toLocaleDateString('es-ES')}</td>
            <td>
                <button class="btn btn-small" onclick="event.stopPropagation(); viewStudent(${student.id})">Ver</button>
            </td>
        </tr>
    `).join('');
}

function updateStats() {
    const avgScore = (studentsData.reduce((a, b) => a + b.score, 0) / studentsData.length).toFixed(0);
    const levelCounts = {};
    studentsData.forEach(s => {
        levelCounts[s.level] = (levelCounts[s.level] || 0) + 1;
    });

    const mostCommonLevel = Object.keys(levelCounts).reduce((a, b) => 
        levelCounts[a] > levelCounts[b] ? a : b
    );

    document.getElementById('totalStudents').textContent = studentsData.length;
    document.getElementById('completedTests').textContent = studentsData.length;
    document.getElementById('avgLevel').textContent = mostCommonLevel;
    document.getElementById('lastTest').textContent = 'Hoy';
}

function filterTable() {
    const level = document.getElementById('levelFilter').value;
    const filtered = level ? studentsData.filter(s => s.level === level) : studentsData;
    renderStudentsTable(filtered);
}

function sortTable(sortBy) {
    let sorted = [...studentsData];
    if (sortBy === 'name') {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'level') {
        const levelOrder = ['C2', 'C1', 'B2', 'B1', 'A2', 'A1'];
        sorted.sort((a, b) => levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level));
    } else {
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    renderStudentsTable(sorted);
}

function viewStudent(id) {
    currentStudent = studentsData.find(s => s.id === id);
    if (!currentStudent) return;

    document.getElementById('dashboardMain').style.display = 'none';
    document.getElementById('detailView').style.display = 'block';

    const initials = currentStudent.name.split(' ').map(n => n[0]).join('');
    document.getElementById('studentInitials').textContent = initials;
    document.getElementById('studentName').textContent = currentStudent.name;
    document.getElementById('studentEmail').textContent = currentStudent.email;

    const levelBadge = document.getElementById('detailLevel');
    levelBadge.textContent = currentStudent.level;
    levelBadge.className = `level-badge level-${currentStudent.level.toLowerCase()}`;

    document.getElementById('detailScore').textContent = currentStudent.score + '%';
    document.getElementById('detailDate').textContent = new Date(currentStudent.date).toLocaleDateString('es-ES');
    document.getElementById('grammarScore').textContent = currentStudent.grammar + '%';
    document.getElementById('vocabScore').textContent = currentStudent.vocab + '%';
    document.getElementById('fluencyScore').textContent = currentStudent.fluency + '%';
    document.getElementById('comprehensionScore').textContent = currentStudent.comprehension + '%';

    generateTopicsList();
}

function generateTopicsList() {
    const level = currentStudent.level;
    const topics = topicsByLevel[level] || {};
    let html = '';

    let priority = 1;
    for (const [category, items] of Object.entries(topics)) {
        items.forEach(item => {
            html += `
                <li style="padding: 0.75rem; margin-bottom: 0.75rem; background: var(--color-background-secondary); border-radius: var(--border-radius-md); border-left: 3px solid var(--color-accent); border: 0.5px solid var(--color-border-tertiary); border-left: 3px solid var(--color-accent);">
                    <div style="font-weight: 600; color: var(--color-primary); font-size: 12px; text-transform: uppercase; margin-bottom: 0.25rem;">Tema ${priority}: ${category}</div>
                    <div style="color: var(--color-text-primary);">${item}</div>
                </li>
            `;
            priority++;
        });
    }

    document.getElementById('topicsList').innerHTML = html;
}

function goBack() {
    document.getElementById('dashboardMain').style.display = 'block';
    document.getElementById('detailView').style.display = 'none';
    currentStudent = null;
}

function downloadStudentPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const pageHeight = doc.internal.pageSize.height;
    let yPos = 20;

    // Header
    doc.setFillColor(44, 82, 130);
    doc.rect(0, 0, 210, 30, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text('English Coffee Time', 20, 15);
    doc.setFontSize(10);
    doc.text('Reporte de Evaluación - Nivel MCER', 20, 23);

    // Content
    doc.setTextColor(0, 0, 0);
    yPos = 45;

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Información del Estudiante', 20, yPos);

    yPos += 10;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Nombre: ${currentStudent.name}`, 20, yPos);
    yPos += 7;
    doc.text(`Correo: ${currentStudent.email}`, 20, yPos);
    yPos += 7;
    doc.text(`Nivel: ${currentStudent.level}`, 20, yPos);
    yPos += 7;
    doc.text(`Fecha: ${new Date(currentStudent.date).toLocaleDateString('es-ES')}`, 20, yPos);

    yPos += 15;
    doc.setFont(undefined, 'bold');
    doc.setFontSize(14);
    doc.text('Puntuaciones', 20, yPos);

    yPos += 10;
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text(`Puntuación General: ${currentStudent.score}%`, 20, yPos);
    yPos += 7;
    doc.text(`Gramática: ${currentStudent.grammar}%`, 20, yPos);
    yPos += 7;
    doc.text(`Vocabulario: ${currentStudent.vocab}%`, 20, yPos);
    yPos += 7;
    doc.text(`Fluidez: ${currentStudent.fluency}%`, 20, yPos);
    yPos += 7;
    doc.text(`Comprensión: ${currentStudent.comprehension}%`, 20, yPos);

    yPos += 15;
    doc.setFont(undefined, 'bold');
    doc.setFontSize(14);
    doc.text('Fortalezas', 20, yPos);
    yPos += 10;
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    currentStudent.strengths.forEach(strength => {
        doc.text(`• ${strength}`, 25, yPos);
        yPos += 7;
    });

    yPos += 5;
    doc.setFont(undefined, 'bold');
    doc.setFontSize(14);
    doc.text('Áreas de Mejora', 20, yPos);
    yPos += 10;
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    currentStudent.weaknesses.forEach(weakness => {
        if (yPos > pageHeight - 20) {
            doc.addPage();
            yPos = 20;
        }
        doc.text(`• ${weakness}`, 25, yPos);
        yPos += 7;
    });

    yPos += 5;
    if (yPos > pageHeight - 20) {
        doc.addPage();
        yPos = 20;
    }
    doc.setFont(undefined, 'bold');
    doc.setFontSize(14);
    doc.text('Plan de Acción Recomendado', 20, yPos);
    yPos += 10;
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    const recommendations = [
        '1. Dedica 30 minutos diarios a conversación en inglés',
        '2. Mira películas y series en inglés con subtítulos',
        '3. Solicita clases personalizadas con English Coffee Time',
        '4. Establece metas claras para los próximos 3 meses'
    ];

    recommendations.forEach(rec => {
        if (yPos > pageHeight - 20) {
            doc.addPage();
            yPos = 20;
        }
        doc.text(rec, 20, yPos);
        yPos += 7;
    });

    doc.save(`${currentStudent.name.replace(' ', '_')}_Report.pdf`);
}

function exportTopics() {
    const level = currentStudent.level;
    const topics = topicsByLevel[level] || {};

    let csv = 'Estudiante,Nivel,Categoría,Tema,Prioridad\n';
    let priority = 1;

    for (const [category, items] of Object.entries(topics)) {
        items.forEach(item => {
            csv += `"${currentStudent.name}","${level}","${category}","${item}",${priority}\n`;
            priority++;
        });
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${currentStudent.name.replace(' ', '_')}_Topics.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Inicializar dashboard
initDashboard();
