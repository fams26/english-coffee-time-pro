// ============================================
// js/supabase-client.js - VERSIÓN CORREGIDA
// ============================================

console.log('📥 Cargando supabase-client.js...');

// 1. ESPERAR A QUE SUPABASE SE CARGUE
if (!window.supabase) {
    console.error('❌ ERROR: Librería Supabase no se cargó');
    console.error('Verifica que está: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>');
} else {
    console.log('✅ Librería Supabase detectada');
}

// 2. CONFIGURACIÓN
const SUPABASE_URL = 'https://yddwapikukyiwzwxbpkb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkZHdhcGlrdWt5aXd6d3hicGtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MzEyMDMsImV4cCI6MjA5NjAwNzIwM30.QfE53nsb-VTUfGEOSuS-6Bks5GSlFYyXaeppwgBNXN4';

console.log('📝 Configuración:');
console.log('  URL:', SUPABASE_URL);
console.log('  KEY: [oculta]');

// 3. INICIALIZAR CLIENTE
let supabaseClient = null;

try {
    const { createClient } = window.supabase;
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('✅ Supabase Client inicializado');
} catch (error) {
    console.error('❌ Error inicializando Supabase Client:', error.message);
    supabaseClient = null;
}

// 4. EXPORTAR GLOBALMENTE
window.supabaseClient = supabaseClient;
window.SUPABASE_URL = SUPABASE_URL;
window.SUPABASE_KEY = SUPABASE_KEY;

console.log('📤 Exportado:');
console.log('  window.supabaseClient:', !!window.supabaseClient);
console.log('  window.SUPABASE_URL:', !!window.SUPABASE_URL);

// ============================================
// AUTENTICACIÓN
// ============================================

/**
 * Registrar nuevo usuario
 */
async function supabaseSignUp(email, password, name) {
    console.log('📝 supabaseSignUp:', email);
    
    if (!supabaseClient) {
        return { success: false, error: 'Cliente no inicializado' };
    }

    try {
        // 1. Registrar en Auth
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            console.error('❌ Error signup:', error.message);
            return { success: false, error: error.message };
        }

        const userId = data.user.id;
        console.log('✅ Usuario creado en Auth:', userId);

        // 2. Crear en tabla users
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
            console.error('❌ Error en tabla users:', insertError.message);
            return { success: false, error: insertError.message };
        }

        console.log('✅ Registro exitoso');
        return { success: true, data: data.user };
    } catch (error) {
        console.error('❌ Error inesperado:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Login
 */
async function supabaseSignIn(email, password) {
    console.log('🔐 supabaseSignIn:', email);
    
    if (!supabaseClient) {
        console.error('❌ Cliente no inicializado');
        return { success: false, error: 'Cliente no inicializado' };
    }

    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.error('❌ Error signin:', error.message);
            return { success: false, error: error.message };
        }

        console.log('✅ Login exitoso:', email);
        return { success: true, data: data.user };
    } catch (error) {
        console.error('❌ Error inesperado:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Logout
 */
async function supabaseSignOut() {
    console.log('👋 supabaseSignOut');
    
    if (!supabaseClient) {
        return { success: false, error: 'Cliente no inicializado' };
    }

    try {
        const { error } = await supabaseClient.auth.signOut();
        
        if (error) {
            console.error('❌ Error signout:', error.message);
            return { success: false, error: error.message };
        }

        console.log('✅ Logout exitoso');
        return { success: true };
    } catch (error) {
        console.error('❌ Error inesperado:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Obtener usuario actual
 */
async function supabaseGetCurrentUser() {
    console.log('👤 supabaseGetCurrentUser');
    
    if (!supabaseClient) {
        console.error('❌ Cliente no inicializado');
        return null;
    }

    try {
        const { data, error } = await supabaseClient.auth.getSession();

        if (error || !data.session) {
            console.log('⚠️ Sin sesión activa');
            return null;
        }

        const user = data.session.user;
        console.log('✅ Usuario encontrado:', user.email);

        // Obtener datos adicionales
        const { data: userData, error: userError } = await supabaseClient
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();

        if (userError) {
            console.warn('⚠️ Error en tabla users:', userError.message);
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
        console.error('❌ Error:', error.message);
        return null;
    }
}

/**
 * Verificar si hay sesión activa
 */
async function supabaseIsAuthenticated() {
    console.log('🔍 supabaseIsAuthenticated');
    
    if (!supabaseClient) {
        console.error('❌ Cliente no inicializado');
        return false;
    }

    try {
        const { data } = await supabaseClient.auth.getSession();
        const isAuth = !!data.session;
        console.log('✅ Auth status:', isAuth);
        return isAuth;
    } catch (error) {
        console.error('❌ Error:', error.message);
        return false;
    }
}

// ============================================
// TEST INICIAL
// ============================================

/**
 * Guardar resultado del test
 */
async function saveinitialTest(studentId, nivel, puntuacion) {
    console.log('📊 saveinitialTest:', nivel);
    
    if (!supabaseClient) {
        return { success: false, error: 'Cliente no inicializado' };
    }

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
            console.error('❌ Error guardando test:', error.message);
            return { success: false, error: error.message };
        }

        console.log('✅ Test guardado');
        return { success: true, data };
    } catch (error) {
        console.error('❌ Error:', error.message);
        return { success: false, error: error.message };
    }
}

// ============================================
// INFORMACIÓN Y DEBUG
// ============================================

// Exportar funciones globalmente
window.supabaseSignUp = supabaseSignUp;
window.supabaseSignIn = supabaseSignIn;
window.supabaseSignOut = supabaseSignOut;
window.supabaseGetCurrentUser = supabaseGetCurrentUser;
window.supabaseIsAuthenticated = supabaseIsAuthenticated;
window.saveinitialTest = saveinitialTest;

// Log final
console.log('✅ Supabase client cargado correctamente');
console.log('📋 Funciones disponibles:');
console.log('  - supabaseSignUp');
console.log('  - supabaseSignIn');
console.log('  - supabaseSignOut');
console.log('  - supabaseGetCurrentUser');
console.log('  - supabaseIsAuthenticated');
console.log('  - saveinitialTest');
console.log('🎉 Listo para usar');

