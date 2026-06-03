// js/supabase-client.js
// Cliente Supabase con funciones de autenticación y BD

// Configuración Supabase
const SUPABASE_URL = 'https://yddwapikukyiwzwxbpkb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkZHdhcGlrdWt5aXd6d3hicGtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MzEyMDMsImV4cCI6MjA5NjAwNzIwM30.QfE53nsb-VTUfGEOSuS-6Bks5GSlFYyXaeppwgBNXN4';

// Inicializar cliente
const { createClient } = window.supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

// ============================================
// FUNCIONES DE AUTENTICACIÓN
// ============================================

/**
 * Registrar nuevo usuario
 */
async function supabaseSignUp(email, password, name) {
    try {
        // 1. Registrar en Auth
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            return { success: false, error: error.message };
        }

        const userId = data.user.id;

        // 2. Crear registro en tabla users
        const { error: insertError } = await supabaseClient
            .from('users')
            .insert([
                {
                    id: userId,
                    email: email,
                    name: name,
                    role: 'student',
                    nivel: null
                }
            ]);

        if (insertError) {
            return { success: false, error: insertError.message };
        }

        return { success: true, data: data.user };
    } catch (error) {
        console.error('Error en signup:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Login
 */
async function supabaseSignIn(email, password) {
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data: data.user };
    } catch (error) {
        console.error('Error en signin:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Logout
 */
async function supabaseSignOut() {
    try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
            return { success: false, error: error.message };
        }
        return { success: true };
    } catch (error) {
        console.error('Error en signout:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Obtener usuario actual
 */
async function supabaseGetCurrentUser() {
    try {
        // Obtener sesión
        const { data, error } = await supabaseClient.auth.getSession();

        if (error || !data.session) {
            return null;
        }

        const user = data.session.user;

        // Obtener datos adicionales de tabla users
        const { data: userData, error: userError } = await supabaseClient
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();

        if (userError) {
            return user;
        }

        return {
            id: user.id,
            email: user.email,
            name: userData.name,
            role: userData.role,
            nivel: userData.nivel
        };
    } catch (error) {
        console.error('Error obtener usuario:', error);
        return null;
    }
}

/**
 * Verificar si hay usuario autenticado
 */
async function supabaseIsAuthenticated() {
    try {
        const { data } = await supabaseClient.auth.getSession();
        return !!data.session;
    } catch (error) {
        return false;
    }
}

// ============================================
// FUNCIONES DE TEST INICIAL
// ============================================

/**
 * Guardar resultado del test inicial
 */
async function saveinitialTest(studentId, nivel, puntuacion) {
    try {
        const { data, error } = await supabaseClient
            .from('initial_assessments')
            .insert([
                {
                    student_id: studentId,
                    nivel_estimado: nivel,
                    puntuacion: puntuacion,
                    fecha: new Date().toISOString()
                }
            ]);

        if (error) {
            console.error('Error guardando test:', error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Obtener resultado del test del estudiante
 */
async function getStudentTest(studentId) {
    try {
        const { data, error } = await supabaseClient
            .from('initial_assessments')
            .select('*')
            .eq('student_id', studentId)
            .order('fecha', { ascending: false })
            .limit(1)
            .single();

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// FUNCIONES DE USUARIO
// ============================================

/**
 * Obtener datos del usuario
 */
async function getUserData(userId) {
    try {
        const { data, error } = await supabaseClient
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Actualizar datos del usuario
 */
async function updateUserData(userId, updates) {
    try {
        const { data, error } = await supabaseClient
            .from('users')
            .update(updates)
            .eq('id', userId);

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Obtener todos los usuarios (admin)
 */
async function getAllUsers() {
    try {
        const { data, error } = await supabaseClient
            .from('users')
            .select('*');

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// FUNCIONES DE GRUPOS (si existen)
// ============================================

/**
 * Obtener grupos del estudiante
 */
async function getStudentGroups(studentId) {
    try {
        const { data, error } = await supabaseClient
            .from('group_members')
            .select('*, groups:group_id(*)')
            .eq('student_id', studentId);

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Crear grupo
 */
async function createGroup(name, teacherId, description = '') {
    try {
        const { data, error } = await supabaseClient
            .from('groups')
            .insert([
                {
                    name: name,
                    teacher_id: teacherId,
                    description: description
                }
            ])
            .select();

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Log out y limpiar
 */
async function cleanupAndLogout() {
    try {
        await supabaseSignOut();
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/index.html';
    } catch (error) {
        console.error('Error cleanup:', error);
    }
}

console.log('✅ Supabase client cargado correctamente');
