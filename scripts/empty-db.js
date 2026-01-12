/**
 * Empty Database Script
 * Truncates all tables while preserving table structure
 */

require('dotenv').config();
const knex = require('knex');
const knexConfig = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];
const db = knex(config);

async function emptyDatabase() {
  try {
    console.log('🗑️  Starting database cleanup...');
    console.log(`   Database: ${config.connection.database}`);
    console.log(`   Host: ${config.connection.host}:${config.connection.port}`);
    
    // Get all table names (excluding knex migration tables)
    const tables = await db.raw(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      AND table_name NOT LIKE 'knex%'
      ORDER BY table_name
    `);
    
    const tableNames = tables.rows.map(row => row.table_name);
    
    if (tableNames.length === 0) {
      console.log('✅ No tables found to truncate');
      process.exit(0);
    }
    
    console.log(`\n📋 Found ${tableNames.length} tables to truncate:`);
    tableNames.forEach(name => console.log(`   - ${name}`));
    
    // Disable foreign key checks temporarily (PostgreSQL doesn't support this directly)
    // Instead, we'll truncate in reverse dependency order or use CASCADE
    console.log('\n🗑️  Truncating tables...');
    
    // Truncate all tables with CASCADE to handle foreign keys
    for (const tableName of tableNames) {
      try {
        await db.raw(`TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE`);
        console.log(`   ✅ Truncated: ${tableName}`);
      } catch (error) {
        console.error(`   ❌ Error truncating ${tableName}:`, error.message);
      }
    }
    
    console.log('\n✅ Database emptied successfully!');
    console.log('   All data has been removed, but table structure is preserved.');
    console.log('   Run "npm run seed" to repopulate with seed data.');
    
  } catch (error) {
    console.error('❌ Error emptying database:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

// Run the script
emptyDatabase();
