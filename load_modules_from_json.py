#!/usr/bin/env python3
"""
Script para cargar módulos desde JSON a Supabase
Uso: python3 load_modules_from_json.py
"""

import json
import os
from supabase import create_client, Client
import time

# Configuración Supabase
SUPABASE_URL = "https://yddwapikukyiwzwxbpkb.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkZHdhcGlrdWt5aXd6d3hicGtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MzEyMDMsImV4cCI6MjA5NjAwNzIwM30.QfE53nsb-VTUfGEOSuS-6Bks5GSlFYyXaeppwgBNXN4"
JSON_FILE = "english-coffee-time-modules-FASE2.json"

# Inicializar cliente Supabase
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def load_json_file():
    """Cargar archivo JSON"""
    print("📖 Cargando JSON...")
    with open(JSON_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    print(f"✅ JSON cargado: {len(data['temas'])} temas")
    return data

def insert_topics(temas):
    """Insertar todos los temas con recursos y preguntas"""
    
    inserted_count = 0
    error_count = 0
    
    for i, tema in enumerate(temas, 1):
        try:
            # 1. Obtener el módulo correspondiente
            nivel = tema['nivel']
            modulo = tema['modulo']
            
            module_response = supabase.table('modules').select('id').eq(
                'nivel', nivel
            ).eq('module_type', modulo).execute()
            
            if not module_response.data:
                print(f"⚠️  No se encontró módulo {nivel}_{modulo}")
                error_count += 1
                continue
            
            module_id = module_response.data[0]['id']
            
            # 2. Insertar tema
            topic_data = {
                'module_id': module_id,
                'titulo': tema['titulo'],
                'descripcion': tema['descripcion'],
                'orden': tema['orden'],
                'tiempo_estimado': tema['tiempo_estimado_minutos'],
                'dificultad': tema['dificultad']
            }
            
            topic_response = supabase.table('module_topics').insert(topic_data).execute()
            
            if not topic_response.data:
                print(f"⚠️  Error al insertar tema: {tema['titulo']}")
                error_count += 1
                continue
            
            topic_id = topic_response.data[0]['id']
            
            # 3. Insertar recursos
            for recurso in tema.get('recursos', []):
                resource_data = {
                    'topic_id': topic_id,
                    'tipo': recurso.get('tipo'),
                    'titulo': recurso.get('titulo'),
                    'url': recurso.get('url'),
                    'plataforma': recurso.get('plataforma'),
                    'duracion': recurso.get('duracion')
                }
                supabase.table('topic_resources').insert(resource_data).execute()
            
            # 4. Insertar preguntas
            for pregunta in tema.get('preguntas', []):
                question_data = {
                    'topic_id': topic_id,
                    'pregunta': pregunta.get('pregunta'),
                    'opcion_a': pregunta['opciones'][0] if len(pregunta.get('opciones', [])) > 0 else '',
                    'opcion_b': pregunta['opciones'][1] if len(pregunta.get('opciones', [])) > 1 else '',
                    'opcion_c': pregunta['opciones'][2] if len(pregunta.get('opciones', [])) > 2 else '',
                    'opcion_d': pregunta['opciones'][3] if len(pregunta.get('opciones', [])) > 3 else '',
                    'respuesta_correcta': chr(65 + pregunta.get('respuesta_correcta', 0)),
                    'explicacion': pregunta.get('explicacion', '')
                }
                supabase.table('questions').insert(question_data).execute()
            
            inserted_count += 1
            
            # Mostrar progreso cada 10 temas
            if i % 10 == 0:
                print(f"📝 {i}/{len(temas)} temas procesados ({inserted_count} insertados)")
            
            # Pequeña pausa para no sobrecargar
            time.sleep(0.1)
        
        except Exception as e:
            print(f"❌ Error procesando tema {i}: {str(e)}")
            error_count += 1
    
    return inserted_count, error_count

def verify_data():
    """Verificar datos insertados"""
    print("\n📊 VERIFICACIÓN:")
    
    # Contar temas
    topics = supabase.table('module_topics').select('COUNT()', count='exact').execute()
    print(f"✅ Temas: {topics.count if hasattr(topics, 'count') else 'N/A'}")
    
    # Contar recursos
    resources = supabase.table('topic_resources').select('COUNT()', count='exact').execute()
    print(f"✅ Recursos: {resources.count if hasattr(resources, 'count') else 'N/A'}")
    
    # Contar preguntas
    questions = supabase.table('questions').select('COUNT()', count='exact').execute()
    print(f"✅ Preguntas: {questions.count if hasattr(questions, 'count') else 'N/A'}")

def main():
    """Función principal"""
    print("=" * 60)
    print("🚀 CARGANDO MÓDULOS A SUPABASE")
    print("=" * 60)
    
    try:
        # 1. Cargar JSON
        data = load_json_file()
        
        # 2. Insertar temas
        print("\n📝 Insertando temas...")
        inserted, errors = insert_topics(data['temas'])
        
        # 3. Verificar
        print(f"\n✅ Insertados: {inserted} temas")
        print(f"❌ Errores: {errors}")
        
        # 4. Mostrar estadísticas
        verify_data()
        
        print("\n" + "=" * 60)
        print("✨ ¡CARGA COMPLETADA!")
        print("=" * 60)
    
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")
        print("Asegúrate que:")
        print("1. El archivo JSON existe: english-coffee-time-modules-FASE2.json")
        print("2. Las credenciales de Supabase son correctas")
        print("3. Tienes 'pip install supabase' instalado")

if __name__ == "__main__":
    main()
