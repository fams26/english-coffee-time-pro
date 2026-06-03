// js/modules-functions.js
// Funciones para gestionar módulos, temas y progreso

// ============================================
// FUNCIONES DE MÓDULOS
// ============================================

/**
 * Obtener todos los módulos de un nivel
 */
async function getModulesByLevel(nivel) {
    try {
        const { data, error } = await supabaseClient
            .from('modules')
            .select('*')
            .eq('nivel', nivel);

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error getting modules:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Obtener un módulo específico
 */
async function getModule(moduleId) {
    try {
        const { data, error } = await supabaseClient
            .from('modules')
            .select('*')
            .eq('id', moduleId)
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error getting module:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// FUNCIONES DE TEMAS
// ============================================

/**
 * Obtener todos los temas de un módulo
 */
async function getTopicsByModule(moduleId) {
    try {
        const { data, error } = await supabaseClient
            .from('module_topics')
            .select('*')
            .eq('module_id', moduleId)
            .order('orden');

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error getting topics:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Obtener un tema específico con sus recursos y preguntas
 */
async function getTopicComplete(topicId) {
    try {
        // Obtener tema
        const topicRes = await supabaseClient
            .from('module_topics')
            .select('*')
            .eq('id', topicId)
            .single();

        if (topicRes.error) throw topicRes.error;

        const topic = topicRes.data;

        // Obtener recursos
        const resourcesRes = await supabaseClient
            .from('topic_resources')
            .select('*')
            .eq('topic_id', topicId);

        if (resourcesRes.error) throw resourcesRes.error;

        // Obtener preguntas
        const questionsRes = await supabaseClient
            .from('questions')
            .select('*')
            .eq('topic_id', topicId);

        if (questionsRes.error) throw questionsRes.error;

        return {
            success: true,
            data: {
                ...topic,
                recursos: resourcesRes.data,
                preguntas: questionsRes.data
            }
        };
    } catch (error) {
        console.error('Error getting complete topic:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Obtener recursos de un tema
 */
async function getTopicResources(topicId) {
    try {
        const { data, error } = await supabaseClient
            .from('topic_resources')
            .select('*')
            .eq('topic_id', topicId);

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error getting resources:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// FUNCIONES DE PREGUNTAS
// ============================================

/**
 * Obtener preguntas de un tema
 */
async function getTopicQuestions(topicId) {
    try {
        const { data, error } = await supabaseClient
            .from('questions')
            .select('*')
            .eq('topic_id', topicId);

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error getting questions:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Verificar respuesta y obtener puntuación
 */
function checkAnswer(userAnswers, correctAnswers) {
    if (userAnswers.length !== correctAnswers.length) {
        return { correct: 0, total: userAnswers.length, percentage: 0 };
    }

    const correct = userAnswers.filter((answer, index) => 
        answer === correctAnswers[index]
    ).length;

    const percentage = Math.round((correct / userAnswers.length) * 100);

    return { correct, total: userAnswers.length, percentage };
}

// ============================================
// FUNCIONES DE PROGRESO
// ============================================

/**
 * Guardar progreso de un estudiante en un tema
 */
async function saveTopicProgress(studentId, topicId, score, completed = false) {
    try {
        const { data, error } = await supabaseClient
            .from('student_progress')
            .upsert([{
                student_id: studentId,
                topic_id: topicId,
                puntuacion: score,
                completado: completed,
                fecha_completacion: completed ? new Date().toISOString() : null,
                intentos: 1
            }], { onConflict: 'student_id,topic_id' });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error saving progress:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Obtener progreso del estudiante en un módulo
 */
async function getModuleProgress(studentId, moduleId) {
    try {
        const { data, error } = await supabaseClient
            .from('student_progress')
            .select(`
                *,
                module_topics:topic_id(module_id)
            `)
            .eq('student_id', studentId)
            .eq('module_topics.module_id', moduleId);

        if (error) throw error;

        const total = data.length;
        const completed = data.filter(d => d.completado).length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        return {
            success: true,
            total,
            completed,
            percentage,
            data
        };
    } catch (error) {
        console.error('Error getting module progress:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Obtener progreso por nivel
 */
async function getLevelProgress(studentId, nivel) {
    try {
        const { data, error } = await supabaseClient
            .from('student_progress')
            .select(`
                *,
                module_topics:topic_id(
                    *,
                    modules:module_id(nivel)
                )
            `)
            .eq('student_id', studentId)
            .eq('module_topics.modules.nivel', nivel);

        if (error) throw error;

        const total = data.length;
        const completed = data.filter(d => d.completado).length;
        const avgScore = data.length > 0 
            ? Math.round(data.reduce((sum, d) => sum + (d.puntuacion || 0), 0) / data.length)
            : 0;

        return {
            success: true,
            total,
            completed,
            percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
            avgScore,
            data
        };
    } catch (error) {
        console.error('Error getting level progress:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Obtener próximos temas recomendados
 */
async function getRecommendedTopics(studentId, nivel, limit = 3) {
    try {
        // Obtener todos los temas del nivel
        const { data: allTopics, error: topicsError } = await supabaseClient
            .from('module_topics')
            .select('*')
            .in('module_id', (
                await supabaseClient
                    .from('modules')
                    .select('id')
                    .eq('nivel', nivel)
            ).data.map(m => m.id));

        if (topicsError) throw topicsError;

        // Obtener temas completados
        const { data: completedTopics, error: progressError } = await supabaseClient
            .from('student_progress')
            .select('topic_id')
            .eq('student_id', studentId)
            .eq('completado', true);

        if (progressError) throw progressError;

        const completedIds = completedTopics.map(t => t.topic_id);
        const recommended = allTopics
            .filter(t => !completedIds.includes(t.id))
            .sort((a, b) => a.orden - b.orden)
            .slice(0, limit);

        return { success: true, data: recommended };
    } catch (error) {
        console.error('Error getting recommended topics:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// FUNCIONES UTILITARIAS
// ============================================

/**
 * Obtener todos los niveles
 */
async function getAllLevels() {
    try {
        const { data, error } = await supabaseClient
            .from('modules')
            .select('nivel')
            .distinct();

        if (error) throw error;
        return { 
            success: true, 
            data: data.map(d => d.nivel).sort()
        };
    } catch (error) {
        console.error('Error getting levels:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Obtener estadísticas generales del estudiante
 */
async function getStudentStats(studentId) {
    try {
        const { data, error } = await supabaseClient
            .from('student_progress')
            .select('*')
            .eq('student_id', studentId);

        if (error) throw error;

        const total = data.length;
        const completed = data.filter(d => d.completado).length;
        const totalPoints = data.reduce((sum, d) => sum + (d.puntuacion || 0), 0);

        return {
            success: true,
            totalTemas: total,
            temasCompletados: completed,
            porcentajeCompletado: total > 0 ? Math.round((completed / total) * 100) : 0,
            puntosTotal: totalPoints,
            promedioPuntos: total > 0 ? Math.round(totalPoints / total) : 0
        };
    } catch (error) {
        console.error('Error getting student stats:', error);
        return { success: false, error: error.message };
    }
}

console.log('✅ Funciones de módulos cargadas');
