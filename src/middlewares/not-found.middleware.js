/**
 * Not Found Middleware
 * Handles 404 errors and returns JSON response instead of HTML
 */

const AppError = require('../utils/errors/AppError');
const errorCodes = require('../utils/errors/errorCodes');

const notFoundHandler = (req, res, next) => {
  // Normalize URL to remove double slashes (except after protocol)
  // Replace multiple consecutive slashes with single slash
  let normalizedUrl = req.originalUrl.replace(/\/+/g, '/');
  // Ensure it starts with a single slash
  if (!normalizedUrl.startsWith('/')) {
    normalizedUrl = '/' + normalizedUrl;
  }
  
  const error = new AppError(
    `Route ${normalizedUrl} not found`,
    404,
    errorCodes.NOT_FOUND
  );
  next(error);
};

module.exports = notFoundHandler;
