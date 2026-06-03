// js/modules-functions.js
// Funciones para gestionar módulos, temas y progreso

console.log('📚 Cargando modules-functions.js...');

// ============================================
// FUNCIONES DE MÓDULOS
// ============================================

/**
 * Obtener todos los módulos de un nivel
 */
async function getModulesByLevel(nivel) {
    console.log('📖 getModulesByLevel:', nivel);
    
    if (!window.supabaseClient) {
        console.error('❌ Cliente no inicializado');
        return { success: false, error: 'Cliente no inicializado' };
    }

    try {
        const { data, error } = await window.supabaseClient
            .from('modules')
            .select('*')
            .eq('nivel', nivel)
            .order('module_type');

        if (error) {
            console.error('❌ Error:', error.message);
            return { success: false, error: error.message };
        }

        console.log('✅ Módulos obtenidos:', data?.length || 0);
        return { success: true, data };
    } catch (error) {
        console.error('❌ Error:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Obtener un módulo específico
 */
async function getModule(moduleId) {
    if (!window.supabaseClient) {
        return { success: false, error: 'Cliente no inicializado' };
    }

    try {
        const { data, error } = await window.supabaseClient
            .from('modules')
            .select('*')
            .eq('id', moduleId)
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('❌ Error getting module:', error.message);
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
    console.log('📝 getTopicsByModule:', moduleId);
    
    if (!window.supabaseClient) {
        return { success: false, error: 'Cliente no inicializado' };
    }

    try {
        const { data, error } = await window.supabaseClient
            .from('module_topics')
            .select('*')
            .eq('module_id', moduleId)
            .order('orden');

        if (error) throw error;
        console.log('✅ Temas obtenidos:', data?.length || 0);
        return { success: true, data };
    } catch (error) {
        console.error('❌ Error getting topics:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Obtener un tema específico con sus recursos y preguntas
 */
async function getTopicComplete(topicId) {
    if (!window.supabaseClient) {
        return { success: false, error: 'Cliente no inicializado' };
    }

    try {
        const topicRes = await window.supabaseClient
            .from('module_topics')
            .select('*')
            .eq('id', topicId)
            .single();

        if (topicRes.error) throw topicRes.error;

        const topic = topicRes.data;

        const resourcesRes = await window.supabaseClient
            .from('topic_resources')
            .select('*')
            .eq('topic_id', topicId);

        if (resourcesRes.error) throw resourcesRes.error;

        const questionsRes = await window.supabaseClient
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
        console.error('❌ Error getting complete topic:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Obtener recursos de un tema
 */
async function getTopicResources(topicId) {
    if (!window.supabaseClient) {
        return { success: false, error: 'Cliente no inicializado' };
    }

    try {
        const { data, error } = await window.supabaseClient
            .from('topic_resources')
            .select('*')
            .eq('topic_id', topicId);

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('❌ Error getting resources:', error.message);
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
    if (!window.supabaseClient) {
        return { success: false, error: 'Cliente no inicializado' };
    }

    try {
        const { data, error } = await window.supabaseClient
            .from('questions')
            .select('*')
            .eq('topic_id', topicId);

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('❌ Error getting questions:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Verificar respuesta
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
 * Guardar progreso de un tema
 */
async function saveTopicProgress(studentId, topicId, score, completed = false) {
    console.log('💾 saveTopicProgress:', topicId, 'score:', score);
    
    if (!window.supabaseClient) {
        return { success: false, error: 'Cliente no inicializado' };
    }

    try {
        const { data, error } = await window.supabaseClient
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
        console.log('✅ Progreso guardado');
        return { success: true, data };
    } catch (error) {
        console.error('❌ Error saving progress:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Obtener progreso en un módulo
 */
async function getModuleProgress(studentId, moduleId) {
    if (!window.supabaseClient) {
        return { success: false, error: 'Cliente no inicializado' };
    }

    try {
        // Obtener todos los temas del módulo
        const { data: topics, error: topicsError } = await window.supabaseClient
            .from('module_topics')
            .select('id')
            .eq('module_id', moduleId);

        if (topicsError) throw topicsError;

        if (!topics || topics.length === 0) {
            return { success: true, total: 0, completed: 0, percentage: 0, data: [] };
        }

        const topicIds = topics.map(t => t.id);

        // Obtener progreso del estudiante
        const { data: progress, error: progressError } = await window.supabaseClient
            .from('student_progress')
            .select('*')
            .eq('student_id', studentId)
            .in('topic_id', topicIds);

        if (progressError) throw progressError;

        const total = topicIds.length;
        const completed = progress?.filter(p => p.completado).length || 0;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        return {
            success: true,
            total,
            completed,
            percentage,
            data: progress || []
        };
    } catch (error) {
        console.error('❌ Error getting module progress:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Obtener progreso por nivel
 */
async function getLevelProgress(studentId, nivel) {
    if (!window.supabaseClient) {
        return { success: false, error: 'Cliente no inicializado' };
    }

    try {
        const { data, error } = await window.supabaseClient
            .from('student_progress')
            .select('*')
            .eq('student_id', studentId);

        if (error) throw error;

        const total = data?.length || 0;
        const completed = data?.filter(d => d.completado).length || 0;
        const avgScore = data && data.length > 0 
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
        console.error('❌ Error getting level progress:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Obtener temas recomendados
 */
async function getRecommendedTopics(studentId, nivel, limit = 3) {
    if (!window.supabaseClient) {
        return { success: false, error: 'Cliente no inicializado' };
    }

    try {
        // Obtener módulos del nivel
        const { data: modules, error: modulesError } = await window.supabaseClient
            .from('modules')
            .select('id')
            .eq('nivel', nivel);

        if (modulesError) throw modulesError;

        if (!modules || modules.length === 0) {
            return { success: true, data: [] };
        }

        const moduleIds = modules.map(m => m.id);

        // Obtener temas del nivel
        const { data: allTopics, error: topicsError } = await window.supabaseClient
            .from('module_topics')
            .select('*')
            .in('module_id', moduleIds)
            .order('orden');

        if (topicsError) throw topicsError;

        // Obtener temas completados
        const { data: completedTopics, error: progressError } = await window.supabaseClient
            .from('student_progress')
            .select('topic_id')
            .eq('student_id', studentId)
            .eq('completado', true);

        if (progressError) throw progressError;

        const completedIds = completedTopics?.map(t => t.topic_id) || [];
        const recommended = allTopics
            ?.filter(t => !completedIds.includes(t.id))
            .slice(0, limit) || [];

        return { success: true, data: recommended };
    } catch (error) {
        console.error('❌ Error getting recommended topics:', error.message);
        return { success: false, error: error.message };
    }
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Obtener todos los niveles
 */
async function getAllLevels() {
    if (!window.supabaseClient) {
        return { success: false, error: 'Cliente no inicializado' };
    }

    try {
        const { data, error } = await window.supabaseClient
            .from('modules')
            .select('nivel')
            .order('nivel');

        if (error) throw error;

        // Remover duplicados
        const levels = [...new Set(data.map(d => d.nivel))].sort();
        return { success: true, data: levels };
    } catch (error) {
        console.error('❌ Error getting levels:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Obtener estadísticas del estudiante
 */
async function getStudentStats(studentId) {
    console.log('📊 getStudentStats:', studentId);
    
    if (!window.supabaseClient) {
        return { success: false, error: 'Cliente no inicializado' };
    }

    try {
        const { data, error } = await window.supabaseClient
            .from('student_progress')
            .select('*')
            .eq('student_id', studentId);

        if (error) throw error;

        const total = data?.length || 0;
        const completed = data?.filter(d => d.completado).length || 0;
        const totalPoints = data?.reduce((sum, d) => sum + (d.puntuacion || 0), 0) || 0;

        console.log('✅ Stats:', { total, completed });

        return {
            success: true,
            totalTemas: total,
            temasCompletados: completed,
            porcentajeCompletado: total > 0 ? Math.round((completed / total) * 100) : 0,
            puntosTotal: totalPoints,
            promedioPuntos: total > 0 ? Math.round(totalPoints / total) : 0
        };
    } catch (error) {
        console.error('❌ Error getting student stats:', error.message);
        return { success: false, error: error.message };
    }
}

console.log('✅ modules-functions.js cargado');
