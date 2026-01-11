/**
 * Transmittal Validator
 */

const Joi = require('joi');

// TODO: Define validation schemas based on database schema
const createSchema = Joi.object({
  // Add fields based on transmittal_forms table schema
});

const updateSchema = Joi.object({
  // Add fields based on transmittal_forms table schema
});

module.exports = {
  createSchema,
  updateSchema
};
