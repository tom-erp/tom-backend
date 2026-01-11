/**
 * Customer Invoice Validator
 */

const Joi = require('joi');

// TODO: Define validation schemas based on database schema
const createSchema = Joi.object({
  // Add fields based on customer_invoices table schema
});

const updateSchema = Joi.object({
  // Add fields based on customer_invoices table schema
});

module.exports = {
  createSchema,
  updateSchema
};
