/**
 * Error Handler Middleware
 * Handles all application errors
 */

const AppError = require('../utils/errors/AppError');
const logger = require('../utils/lib/logger');
const errorCodes = require('../utils/errors/errorCodes');

const errorHandler = (err, req, res, _next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  logger.error(err);

  // AppError (custom error)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        code: err.code,
        ...(err.errors && { errors: err.errors })
      }
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new AppError('Invalid token', 401, errorCodes.INVALID_TOKEN);
    return res.status(error.statusCode).json({
      success: false,
      error: {
        message: error.message,
        code: error.code
      }
    });
  }

  if (err.name === 'TokenExpiredError') {
    error = new AppError('Token expired', 401, errorCodes.TOKEN_EXPIRED);
    return res.status(error.statusCode).json({
      success: false,
      error: {
        message: error.message,
        code: error.code
      }
    });
  }

  // PostgreSQL errors
  if (err.code === '23505') { // Unique violation
    error = new AppError('Duplicate entry', 409, errorCodes.DUPLICATE_ENTRY);
    return res.status(error.statusCode).json({
      success: false,
      error: {
        message: error.message,
        code: error.code
      }
    });
  }

  if (err.code === '23503') { // Foreign key violation
    error = new AppError('Referenced resource not found', 400, errorCodes.VALIDATION_ERROR);
    return res.status(error.statusCode).json({
      success: false,
      error: {
        message: error.message,
        code: error.code
      }
    });
  }

  // Default error
  res.status(error.statusCode || 500).json({
    success: false,
    error: {
      message: error.message || 'Internal Server Error',
      code: error.code || errorCodes.INTERNAL_SERVER_ERROR,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

module.exports = errorHandler;
