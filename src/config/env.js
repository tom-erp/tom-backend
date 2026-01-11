require('dotenv').config();

const requiredEnvVars = [
  'NODE_ENV',
  'PORT',
  'DB_HOST',
  'DB_PORT',
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',
  'JWT_SECRET'
];

const validateEnv = () => {
  const missing = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

if (process.env.NODE_ENV !== 'test') {
  validateEnv();
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 3000,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT, 10) || 5432,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_SSL: process.env.DB_SSL === 'true',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT, 10) || 587,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_FROM: process.env.EMAIL_FROM || 'noreply@tom.com',
  UPLOAD_MAX_SIZE: parseInt(process.env.UPLOAD_MAX_SIZE, 10) || 10485760,
  UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads',
  API_VERSION: process.env.API_VERSION || 'v1',
  API_PREFIX: process.env.API_PREFIX || '/api',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  LOG_DIR: process.env.LOG_DIR || './logs'
};
