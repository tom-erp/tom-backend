const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const config = require('./config/env');
const errorHandler = require('./middlewares/error-handler.middleware');
const logger = require('./utils/lib/logger');

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(cors());

// Compression
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Normalize request URLs (remove double slashes)
app.use((req, res, next) => {
  // Normalize the URL path to remove double slashes
  if (req.url.includes('//')) {
    req.url = req.url.replace(/\/+/g, '/');
  }
  if (req.originalUrl.includes('//')) {
    req.originalUrl = req.originalUrl.replace(/\/+/g, '/');
  }
  next();
});

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
const routes = require('./routes');
// Normalize path to prevent double slashes
const apiPath = `${config.API_PREFIX}/${config.API_VERSION}`.replace(/\/+/g, '/');
app.use(apiPath, routes);

// 404 handler (must be before error handler)
const notFoundHandler = require('./middlewares/not-found.middleware');
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
