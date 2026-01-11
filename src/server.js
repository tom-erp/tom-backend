const app = require('./app');
const config = require('./config/env');
const logger = require('./utils/lib/logger');
const db = require('./config/database');

const PORT = config.PORT || 3000;

// Test database connection before starting server
const startServer = async () => {
  try {
    // Test database connection
    await db.raw('SELECT 1');
    
    // Start server
    app.listen(PORT, () => {
      logger.info('================================================================');
      logger.info('🚀 TOM Backend Server Started Successfully');
      logger.info('================================================================');
      logger.info(`   Server:      http://localhost:${PORT}`);
      logger.info(`   Environment: ${config.NODE_ENV}`);
      logger.info(`   Port:        ${PORT}`);
      logger.info(`   API:         http://localhost:${PORT}${config.API_PREFIX}/${config.API_VERSION}`);
      logger.info(`   Database:    ${config.DB_NAME} @ ${config.DB_HOST}:${config.DB_PORT}`);
      logger.info(`   Log Level:   ${config.LOG_LEVEL}`);
      logger.info(`   Upload Dir:  ${config.UPLOAD_DIR}`);
      logger.info('================================================================');
      logger.info('✅ Server is ready to accept connections');
      logger.info('================================================================');
    });
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! Shutting down...');
  logger.error(err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down...');
  logger.error(err);
  process.exit(1);
});
