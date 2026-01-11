/**
 * Vendor Validator
 */

const Joi = require('joi');

// TODO: Define validation schemas based on database schema
const createSchema = Joi.object({
  // Add fields based on vendors table schema
});

const updateSchema = Joi.object({
  // Add fields based on vendors table schema
});

module.exports = {
  createSchema,
  updateSchema
};
