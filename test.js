// Estado del test
const state = {
    currentPhase: 1,
    currentQuestion: 0,
    totalQuestions: 15,
    studentName: '',
    studentEmail: '',
    currentLevel: 'B1',
    levelScore: 50,
    startTime: null,
    responses: [],
    timeElapsed: 0,
    testDuration: 45 * 60,
    timerInterval: null
};

const levelMap = {
    'A1': 0, 'A2': 20, 'B1': 40, 'B2': 60, 'C1': 80, 'C2': 100
};

const levelList = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

// Preguntas por fase y nivel
const questionsDatabase = {
    1: [ // Conversación y Diagnóstico
        { type: 'open', text: 'Tell me about your typical workday. What do you do in the morning?' },
        { type: 'open', text: 'What is your favorite hobby and why do you enjoy it?' },
        { type: 'open', text: 'Describe your ideal vacation destination.' },
        { type: 'open', text: 'How do you usually spend your weekends?' },
        { type: 'open', text: 'What languages do you speak besides English?' }
    ],
    2: [ // Escenarios
        { type: 'scenario', scenario: 'You are at a coffee shop and the barista made your order wrong.', text: 'What do you say to the barista?' },
        { type: 'scenario', scenario: 'Your boss asks you in a meeting why a project is delayed.', text: 'How would you respond professionally?' },
        { type: 'scenario', scenario: 'You meet someone at a conference and want to exchange contact information.', text: 'What would you say?' },
        { type: 'scenario', scenario: 'A colleague is asking for your advice on a work problem.', text: 'How would you help?' }
    ],
    3: [ // Producción Escrita
        { type: 'writing', text: 'Write a formal email to a client apologizing for a delayed delivery.' },
        { type: 'writing', text: 'Write a short paragraph about the importance of learning English.' },
        { type: 'writing', text: 'Write a brief summary of a book or movie you recently enjoyed.' }
    ],
    4: [ // Comprensión
        { type: 'comprehension', text: 'Read: "Technology has changed how we work. Many people now work remotely, which offers flexibility but also challenges." What is the main idea?' },
        { type: 'comprehension', text: 'Read: "Climate change is one of the most pressing issues of our time. Scientists worldwide are working to understand and mitigate its effects." What does the passage emphasize?' }
    ]
};

// Event Listeners
document.getElementById('startForm').addEventListener('submit', (e) => {
    e.preventDefault();
    startTest();
});

function startTest() {
    const name = document.getElementById('studentName').value.trim();
    const email = document.getElementById('studentEmail').value.trim();

    if (!name || !email) {
        alert('Por favor completa tu nombre y correo');
        return;
    }

    state.studentName = name;
    state.studentEmail = email;
    state.startTime = Date.now();

    // Guardar en localStorage
    localStorage.setItem('testData', JSON.stringify({
        name: state.studentName,
        email: state.studentEmail,
        startTime: state.startTime
    }));

    document.getElementById('startSection').style.display = 'none';
    document.getElementById('testSection').style.display = 'block';

    startTimer();
    loadQuestion();
}

function startTimer() {
    state.timerInterval = setInterval(() => {
        state.timeElapsed++;
        const remaining = state.testDuration - state.timeElapsed;
        const mins = Math.floor(remaining / 60);
        const secs = remaining % 60;
        document.getElementById('timer').textContent =
            `${mins}:${secs < 10 ? '0' : ''}${secs}`;

        if (remaining <= 0) {
            clearInterval(state.timerInterval);
            finishTest();
        }
    }, 1000);
}

function updateProgress() {
    const progress = (state.currentQuestion / state.totalQuestions) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('questionNum').textContent = state.currentQuestion;
    document.getElementById('levelDisplay').textContent = state.currentLevel;

    // Determinar fase
    if (state.currentQuestion <= 4) state.currentPhase = 1;
    else if (state.currentQuestion <= 8) state.currentPhase = 2;
    else if (state.currentQuestion <= 12) state.currentPhase = 3;
    else state.currentPhase = 4;

    document.getElementById('phaseBadge').textContent = `Fase ${state.currentPhase}`;
}

function loadQuestion() {
    state.currentQuestion++;
    updateProgress();

    const phaseQuestions = questionsDatabase[state.currentPhase] || [];
    const question = phaseQuestions[Math.floor(Math.random() * phaseQuestions.length)];

    if (question) {
        renderQuestion(question);
    } else {
        finishTest();
    }
}

function renderQuestion(question) {
    let html = '';

    if (question.scenario) {
        html += `<div style="background: var(--color-background-secondary); padding: 1rem; border-radius: var(--border-radius-md); margin-bottom: 1rem; border-left: 3px solid var(--color-accent);">
            <strong>📍 Situación:</strong> ${question.scenario}
        </div>`;
    }

    html += `<div>
        <p style="font-size: 16px; font-weight: 500; margin-bottom: 1rem; color: var(--color-text-primary);">${question.text}</p>
        <div class="form-group">
            <textarea id="answerText" placeholder="Escribe tu respuesta aquí..." style="min-height: 150px;"></textarea>
        </div>
        <div style="display: flex; gap: 1rem;">
            <button class="btn" onclick="skipQuestion()">Omitir</button>
            <button class="btn btn-primary" onclick="submitAnswer('${question.type}')" style="flex: 1;">Continuar</button>
        </div>
    </div>`;

    document.getElementById('questionContainer').innerHTML = html;
}

function submitAnswer(type) {
    const answer = document.getElementById('answerText')?.value.trim() || '';

    if (!answer) {
        alert('Por favor proporciona una respuesta');
        return;
    }

    document.getElementById('loadingIndicator').style.display = 'block';
    document.getElementById('questionContainer').style.display = 'none';

    // Simular evaluación
    setTimeout(() => {
        evaluateAnswer(answer, type);
    }, 1000);
}

function evaluateAnswer(answer, type) {
    // Calcular score basado en longitud y complejidad
    const score = calculateScore(answer, type);

    state.responses.push({
        question: state.currentQuestion,
        answer: answer,
        score: score,
        type: type,
        level: state.currentLevel
    });

    // Adaptación de nivel
    if (score > 75) {
        levelUp();
    } else if (score < 40) {
        levelDown();
    }

    if (state.currentQuestion >= state.totalQuestions) {
        clearInterval(state.timerInterval);
        finishTest();
    } else {
        document.getElementById('loadingIndicator').style.display = 'none';
        document.getElementById('questionContainer').style.display = 'block';
        loadQuestion();
    }
}

function calculateScore(answer, type) {
    let score = 50;

    // Bonificación por longitud
    if (answer.length > 150) score += 10;
    if (answer.length > 250) score += 10;

    // Bonificación por complejidad (buscar palabras clave)
    const complexWords = ['however', 'although', 'furthermore', 'therefore', 'whereas', 'despite', 'consequently'];
    const foundComplex = complexWords.filter(word => answer.toLowerCase().includes(word)).length;
    score += foundComplex * 5;

    // Variación aleatoria
    score += Math.random() * 20 - 10;

    return Math.min(100, Math.max(0, score));
}

function levelUp() {
    const currentIndex = levelList.indexOf(state.currentLevel);
    if (currentIndex < levelList.length - 1) {
        state.currentLevel = levelList[currentIndex + 1];
    }
}

function levelDown() {
    const currentIndex = levelList.indexOf(state.currentLevel);
    if (currentIndex > 0) {
        state.currentLevel = levelList[currentIndex - 1];
    }
}

function skipQuestion() {
    if (state.currentQuestion >= state.totalQuestions) {
        finishTest();
    } else {
        document.getElementById('questionContainer').innerHTML = '';
        loadQuestion();
    }
}

function finishTest() {
    document.getElementById('testSection').style.display = 'none';
    document.getElementById('reportSection').style.display = 'block';

    generateReport();
}

function generateReport() {
    const avgScore = (state.responses.reduce((a, b) => a + b.score, 0) / state.responses.length).toFixed(0);

    document.getElementById('finalLevel').textContent = state.currentLevel;
    document.getElementById('grammarScore').textContent = Math.floor(avgScore - 5) + '%';
    document.getElementById('vocabScore').textContent = Math.floor(avgScore + 3) + '%';
    document.getElementById('fluencyScore').textContent = Math.floor(avgScore - 8) + '%';
    document.getElementById('comprehensionScore').textContent = Math.floor(avgScore) + '%';

    const strengths = [
        `Dominio de vocabulario en contextos ${state.currentLevel <= 'B1' ? 'cotidianos' : 'profesionales'}.`,
        `Capacidad de ${state.currentLevel <= 'B1' ? 'comunicación básica' : 'expresión compleja'}.`,
        `Comprensión de textos ${state.currentLevel <= 'B1' ? 'simples' : 'avanzados'}.`
    ];

    const weaknesses = [
        `Mejora en estructuras gramaticales ${state.currentLevel <= 'A2' ? 'básicas' : 'complejas'}.`,
        `Fluidez y pronunciación en conversaciones naturales.`,
        `Comprensión auditiva de acentos variados.`
    ];

    document.getElementById('strength1').textContent = strengths[0];
    document.getElementById('strength2').textContent = strengths[1];
    document.getElementById('strength3').textContent = strengths[2];
    document.getElementById('weakness1').textContent = weaknesses[0];
    document.getElementById('weakness2').textContent = weaknesses[1];
    document.getElementById('weakness3').textContent = weaknesses[2];

    const recommendations = [
        `<div style="padding: 1rem; background: var(--color-background-secondary); border-radius: var(--border-radius-md); margin-bottom: 1rem; border-left: 3px solid var(--color-accent);"><strong>1. Práctica Regular:</strong> Dedica 30 minutos diarios a conversación en inglés.</div>`,
        `<div style="padding: 1rem; background: var(--color-background-secondary); border-radius: var(--border-radius-md); margin-bottom: 1rem; border-left: 3px solid var(--color-accent);"><strong>2. Consumo de Contenido:</strong> Mira películas y series en inglés con subtítulos en español.</div>`,
        `<div style="padding: 1rem; background: var(--color-background-secondary); border-radius: var(--border-radius-md); margin-bottom: 1rem; border-left: 3px solid var(--color-accent);"><strong>3. Clases Personalizadas:</strong> Solicita clases con English Coffee Time para acelerar tu progreso.</div>`,
        `<div style="padding: 1rem; background: var(--color-background-secondary); border-radius: var(--border-radius-md); border-left: 3px solid var(--color-accent);"><strong>4. Objetivo Próximo:</strong> Alcanza el nivel ${levelList[levelList.indexOf(state.currentLevel) + 1] || 'C2'} en 3 meses.</div>`
    ];

    document.getElementById('actionPlan').innerHTML = recommendations.join('');

    // Guardar resultado
    const result = {
        name: state.studentName,
        email: state.studentEmail,
        level: state.currentLevel,
        scores: {
            grammar: Math.floor(avgScore - 5),
            vocab: Math.floor(avgScore + 3),
            fluency: Math.floor(avgScore - 8),
            comprehension: Math.floor(avgScore)
        },
        overallScore: Math.floor(avgScore),
        date: new Date().toISOString()
    };

    localStorage.setItem('lastResult', JSON.stringify(result));
}

function downloadReport() {
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
    doc.text(`Nombre: ${state.studentName}`, 20, yPos);
    yPos += 7;
    doc.text(`Correo: ${state.studentEmail}`, 20, yPos);
    yPos += 7;
    doc.text(`Nivel: ${state.currentLevel}`, 20, yPos);
    yPos += 7;
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 20, yPos);

    yPos += 15;
    doc.setFont(undefined, 'bold');
    doc.setFontSize(14);
    doc.text('Puntuaciones', 20, yPos);

    yPos += 10;
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    const grammarScore = document.getElementById('grammarScore').textContent;
    const vocabScore = document.getElementById('vocabScore').textContent;
    const fluencyScore = document.getElementById('fluencyScore').textContent;
    const comprehensionScore = document.getElementById('comprehensionScore').textContent;

    doc.text(`Puntuación General: ${((parseInt(grammarScore) + parseInt(vocabScore) + parseInt(fluencyScore) + parseInt(comprehensionScore)) / 4).toFixed(0)}%`, 20, yPos);
    yPos += 7;
    doc.text(`Gramática: ${grammarScore}`, 20, yPos);
    yPos += 7;
    doc.text(`Vocabulario: ${vocabScore}`, 20, yPos);
    yPos += 7;
    doc.text(`Fluidez: ${fluencyScore}`, 20, yPos);
    yPos += 7;
    doc.text(`Comprensión: ${comprehensionScore}`, 20, yPos);

    yPos += 15;
    doc.setFont(undefined, 'bold');
    doc.setFontSize(14);
    doc.text('Plan de Acción', 20, yPos);

    yPos += 10;
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    const recommendations = [
        '1. Dedica 30 minutos diarios a conversación en inglés.',
        '2. Mira películas y series en inglés con subtítulos.',
        '3. Solicita clases personalizadas con English Coffee Time.',
        '4. Establece metas claras para los próximos 3 meses.'
    ];

    recommendations.forEach(rec => {
        if (yPos > pageHeight - 20) {
            doc.addPage();
            yPos = 20;
        }
        doc.text(rec, 20, yPos);
        yPos += 7;
    });

    doc.save(`${state.studentName.replace(' ', '_')}_Test_Result.pdf`);
}
