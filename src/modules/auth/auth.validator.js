/**
 * Auth Validator
 */

const Joi = require('joi');

// TODO: Define validation schemas based on database schema
const createSchema = Joi.object({
  // Add fields based on users table schema
});

const updateSchema = Joi.object({
  // Add fields based on users table schema
});

module.exports = {
  createSchema,
  updateSchema
};
