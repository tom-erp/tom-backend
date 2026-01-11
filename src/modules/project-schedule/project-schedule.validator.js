/**
 * Project Schedule Validator
 */

const Joi = require('joi');

// TODO: Define validation schemas based on database schema
const createSchema = Joi.object({
  // Add fields based on project_schedules table schema
});

const updateSchema = Joi.object({
  // Add fields based on project_schedules table schema
});

module.exports = {
  createSchema,
  updateSchema
};
