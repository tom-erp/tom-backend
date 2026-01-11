/**
 * Client Purchase Order Validator
 */

const Joi = require('joi');

// TODO: Define validation schemas based on database schema
const createSchema = Joi.object({
  // Add fields based on client_purchase_orders table schema
});

const updateSchema = Joi.object({
  // Add fields based on client_purchase_orders table schema
});

module.exports = {
  createSchema,
  updateSchema
};
