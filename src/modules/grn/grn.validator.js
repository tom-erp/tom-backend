/**
 * GRN Validator
 */

const Joi = require('joi');

// TODO: Define validation schemas based on database schema
const createSchema = Joi.object({
  // Add fields based on goods_received_notes table schema
});

const updateSchema = Joi.object({
  // Add fields based on goods_received_notes table schema
});

module.exports = {
  createSchema,
  updateSchema
};
