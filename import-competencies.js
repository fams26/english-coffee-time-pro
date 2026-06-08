#!/usr/bin/env node

/**
 * Script para importar competencias desde CSV a Supabase
 *
 * USO: node import-competencies.js
 *
 * Antes de ejecutar:
 * 1. npm install @supabase/supabase-js dotenv csv-parse
 * 2. Crea un archivo .env con:
 *    VITE_SUPABASE_URL=tu_url
 *    VITE_SUPABASE_ANON_KEY=tu_key
 */

import { createClient } from '@supabase/supabase-js';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Error: Variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY no configuradas');
  console.error('Crea un archivo .env con tus credenciales');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function importCompetencies() {
  try {
    console.log('📂 Leyendo archivo CSV...');
    
    // Leer el CSV - CAMBIAR ESTE NOMBRE SI ES NECESARIO
    const csvFile = fs.readFileSync('./Temas_Competencias_COMPLETO_A1_a_C2.csv', 'utf-8');
    
    // Parsear CSV
    const records = parse(csvFile, {
      columns: ['nivel', 'modulo', 'competencia', 'descriptores', 'contextos_uso'],
      skip_empty_lines: true,
      from_line: 2  // Saltar header
    });

    console.log(`✅ CSV parseado. Total de filas: ${records.length}`);

    // Limpiar tabla (opcional - comentar si quieres preservar datos)
    console.log('🗑️  Limpiando tabla competencies...');
    await supabase.from('competencies').delete().neq('id', 'null');

    // Insertar en lotes
    const BATCH_SIZE = 50;
    let inserted = 0;
    let failed = 0;

    for (let i = 0; i < records.length; i += BATCH_SIZE) {
      const batch = records.slice(i, i + BATCH_SIZE);
      
      // Agregar número de orden
      const batchWithOrder = batch.map((record, idx) => ({
        ...record,
        orden: idx
      }));

      try {
        const { error } = await supabase
          .from('competencies')
          .insert(batchWithOrder);

        if (error) {
          console.error(`❌ Error en lote ${i}-${i + batch.length}:`, error);
          failed += batch.length;
        } else {
          inserted += batch.length;
          console.log(`✓ Insertado lote ${i}-${i + batch.length}/${records.length}`);
        }
      } catch (err) {
        console.error(`❌ Error insertando lote:`, err);
        failed += batch.length;
      }
    }

    console.log('\n📊 RESUMEN:');
    console.log(`✅ Insertados: ${inserted}`);
    console.log(`❌ Fallidos: ${failed}`);
    console.log(`📈 Total: ${inserted + failed}`);

    // Verificar por nivel
    console.log('\n📈 Distribución por nivel:');
    const { data: byLevel } = await supabase
      .from('competencies')
      .select('nivel');

    if (byLevel) {
      const levels = {};
      byLevel.forEach(row => {
        levels[row.nivel] = (levels[row.nivel] || 0) + 1;
      });

      Object.entries(levels).sort().forEach(([nivel, count]) => {
        console.log(`  ${nivel}: ${count} competencias`);
      });
    }

  } catch (error) {
    console.error('❌ Error fatal:', error.message);
    process.exit(1);
  }
}

// Ejecutar
console.log('🚀 Iniciando importación de competencias...\n');
importCompetencies().then(() => {
  console.log('\n✅ Importación completada');
  process.exit(0);
}).catch(err => {
  console.error('❌ Importación fallida:', err);
  process.exit(1);
});
