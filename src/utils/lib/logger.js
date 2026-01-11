const winston = require('winston');
const path = require('path');
const config = require('../../config/env');

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

const logger = winston.createLogger({
  level: config.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: { service: 'tom-backend' },
  transports: [
    new winston.transports.File({
      filename: path.join(config.LOG_DIR, 'error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.join(config.LOG_DIR, 'combined.log')
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  );
}

module.exports = logger;
