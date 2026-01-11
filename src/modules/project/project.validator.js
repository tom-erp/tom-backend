/**
 * Project Validator
 */

const Joi = require('joi');

// TODO: Define validation schemas based on database schema
const createSchema = Joi.object({
  // Add fields based on projects table schema
});

const updateSchema = Joi.object({
  // Add fields based on projects table schema
});

module.exports = {
  createSchema,
  updateSchema
};
