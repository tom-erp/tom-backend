/**
 * Validator Middleware
 * Validates request body using Joi schemas
 */

const AppError = require('../utils/errors/AppError');
const errorCodes = require('../utils/errors/errorCodes');

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return next(new AppError('Validation error', 400, errorCodes.VALIDATION_ERROR, errors));
    }

    // Replace req.body with validated and sanitized value
    req.body = value;
    next();
  };
};

module.exports = {
  validate
};
