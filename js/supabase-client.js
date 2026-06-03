// js/supabase-client.js
// INSTRUCCIONES:
// 1. REEMPLAZA TUS_VALORES con tus credenciales de Supabase
// 2. Obtén SUPABASE_URL y SUPABASE_ANON_KEY de: 
//    https://app.supabase.com/project/YOUR_PROJECT/settings/api

const SUPABASE_URL = 'https://yddwapikukyiwzwxbpkb.supabase.co'; // REEMPLAZA
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkZHdhcGlrdWt5aXd6d3hicGtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MzEyMDMsImV4cCI6MjA5NjAwNzIwM30.QfE53nsb-VTUfGEOSuS-6Bks5GSlFYyXaeppwgBNXN4'; // REEMPLAZA

// Crear cliente Supabase
const { createClient } = window.supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// FUNCIONES DE AUTENTICACIÓN
// ============================================

/**
 * Registrar nuevo usuario
 */
async function supabaseSignUp(email, password, userData) {
    try {
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    nombre: userData.nombre,
                    role: userData.role
                }
            }
        });

        if (error) throw error;

        // Guardar usuario en tabla users
        const { error: insertError } = await supabaseClient
            .from('users')
            .insert([{
                id: data.user.id,
                email: email,
                name: userData.nombre,
                role: userData.role,
                nivel: null
            }]);

        if (insertError) throw insertError;

        return { success: true, user: data.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Login de usuario
 */
async function supabaseSignIn(email, password) {
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;

        // Obtener datos del usuario
        const { data: userData, error: userError } = await supabaseClient
            .from('users')
            .select('*')
            .eq('id', data.user.id)
            .single();

        if (userError) throw userError;

        return { success: true, user: userData };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Logout
 */
async function supabaseSignOut() {
    try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw error;
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Obtener usuario actual
 */
async function supabaseGetCurrentUser() {
    try {
        const { data: { user }, error } = await supabaseClient.auth.getUser();
        
        if (error || !user) return null;

        // Obtener datos del usuario
        const { data: userData, error: userError } = await supabaseClient
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();

        if (userError) return null;
        return userData;
    } catch (error) {
        return null;
    }
}

// ============================================
// FUNCIONES DE PROGRESO
// ============================================

/**
 * Guardar test inicial
 */
async function saveinitialTest(studentId, level, score) {
    try {
        const { error } = await supabaseClient
            .from('initial_assessments')
            .insert([{
                student_id: studentId,
                nivel_estimado: level,
                puntuacion: score
            }]);

        if (error) throw error;

        // Actualizar nivel del usuario
        const { error: updateError } = await supabaseClient
            .from('users')
            .update({ nivel: level })
            .eq('id', studentId);

        if (updateError) throw updateError;

        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Guardar progreso de módulo
 */
async function saveModuleProgress(studentId, moduleId, score, completed = false) {
    try {
        const { error } = await supabaseClient
            .from('student_progress')
            .upsert([{
                student_id: studentId,
                module_id: moduleId,
                puntuacion: score,
                completado: completed,
                fecha_completacion: completed ? new Date().toISOString() : null,
                intentos: 1
            }], { onConflict: 'student_id,module_id' });

        if (error) throw error;
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Obtener progreso del estudiante
 */
async function getStudentProgress(studentId) {
    try {
        const { data, error } = await supabaseClient
            .from('student_progress')
            .select(`
                *,
                modules(nivel, module_type, nombre)
            `)
            .eq('student_id', studentId)
            .order('fecha_completacion', { ascending: false });

        if (error) throw error;
        return { success: true, data: data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Obtener progreso por nivel
 */
async function getProgressByLevel(studentId, level) {
    try {
        const { data, error } = await supabaseClient
            .from('student_progress')
            .select('*')
            .eq('student_id', studentId)
            .eq('nivel', level);

        if (error) throw error;

        const total = data.length;
        const completed = data.filter(d => d.completado).length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        return {
            success: true,
            total: total,
            completed: completed,
            percentage: percentage
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// ============================================
// FUNCIONES DE GRUPO (PROFESOR)
// ============================================

/**
 * Crear grupo
 */
async function createGroup(teacherId, name, description) {
    try {
        const { data, error } = await supabaseClient
            .from('groups')
            .insert([{
                teacher_id: teacherId,
                name: name,
                description: description
            }])
            .select();

        if (error) throw error;
        return { success: true, group: data[0] };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Obtener grupos del profesor
 */
async function getTeacherGroups(teacherId) {
    try {
        const { data, error } = await supabaseClient
            .from('groups')
            .select('*')
            .eq('teacher_id', teacherId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { success: true, groups: data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Obtener estudiantes de un grupo
 */
async function getGroupStudents(groupId) {
    try {
        const { data, error } = await supabaseClient
            .from('group_members')
            .select(`
                *,
                users(id, name, email, nivel)
            `)
            .eq('group_id', groupId);

        if (error) throw error;

        // Obtener progreso de cada estudiante
        const studentsWithProgress = await Promise.all(
            data.map(async (member) => {
                const progress = await getStudentProgress(member.users.id);
                return {
                    ...member.users,
                    modules_completed: progress.data ? progress.data.filter(p => p.completado).length : 0,
                    average_score: progress.data ? 
                        Math.round(progress.data.reduce((acc, p) => acc + (p.puntuacion || 0), 0) / progress.data.length) : 0
                };
            })
        );

        return { success: true, students: studentsWithProgress };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Agregar estudiante a grupo
 */
async function addStudentToGroup(groupId, studentId) {
    try {
        const { error } = await supabaseClient
            .from('group_members')
            .insert([{
                group_id: groupId,
                student_id: studentId
            }]);

        if (error) throw error;
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// ============================================
// EXPORTAR FUNCIONES
// ============================================
