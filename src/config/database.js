const knex = require('knex');
const knexConfig = require('../../knexfile');
const logger = require('../utils/lib/logger');

const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];

logger.info('🔌 Initializing database connection...');
logger.info(`   Environment: ${environment}`);
logger.info(`   Host: ${config.connection.host}`);
logger.info(`   Port: ${config.connection.port}`);
logger.info(`   Database: ${config.connection.database}`);

const db = knex(config);

// Test database connection
const testConnection = async () => {
  try {
    await db.raw('SELECT 1');
    logger.info('✅ Database connection successful');
    return true;
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
    throw error;
  }
};

// Initialize connection test
testConnection().catch((error) => {
  logger.error('Failed to connect to database:', error);
  process.exit(1);
});

module.exports = db;
