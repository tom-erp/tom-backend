/**
 * Organization Validator
 * Validation schemas for organization endpoints
 */

const Joi = require('joi');

const validTypes = ['client', 'vendor', 'both'];
const validStatuses = ['active', 'inactive', 'suspended'];

const createSchema = Joi.object({
  code: Joi.string().min(1).max(50).required().messages({
    'string.min': 'Code is required',
    'string.max': 'Code must not exceed 50 characters',
    'any.required': 'Code is required'
  }),
  name: Joi.string().min(1).max(255).required().messages({
    'string.min': 'Name is required',
    'string.max': 'Name must not exceed 255 characters',
    'any.required': 'Name is required'
  }),
  type: Joi.string().valid(...validTypes).required().messages({
    'any.only': 'Type must be one of: client, vendor, both',
    'any.required': 'Type is required'
  }),
  registration_number: Joi.string().max(100).optional().allow(null, ''),
  tax_id: Joi.string().max(100).optional().allow(null, ''),
  contact_person: Joi.string().max(255).optional().allow(null, ''),
  email: Joi.string().email().optional().allow(null, '').messages({
    'string.email': 'Please provide a valid email address'
  }),
  phone: Joi.string().max(20).optional().allow(null, ''),
  address: Joi.string().optional().allow(null, ''),
  city: Joi.string().max(100).optional().allow(null, ''),
  state: Joi.string().max(100).optional().allow(null, ''),
  country: Joi.string().max(100).optional().default('Singapore'),
  postal_code: Joi.string().max(20).optional().allow(null, ''),
  payment_terms: Joi.string().max(50).optional().allow(null, ''),
  credit_limit: Joi.number().precision(2).optional().allow(null),
  currency: Joi.string().length(3).optional().default('SGD'),
  status: Joi.string().valid(...validStatuses).optional().default('active'),
  notes: Joi.string().optional().allow(null, ''),
  created_by: Joi.number().integer().optional().allow(null)
});

const updateSchema = Joi.object({
  code: Joi.string().min(1).max(50).optional().messages({
    'string.min': 'Code cannot be empty',
    'string.max': 'Code must not exceed 50 characters'
  }),
  name: Joi.string().min(1).max(255).optional().messages({
    'string.min': 'Name cannot be empty',
    'string.max': 'Name must not exceed 255 characters'
  }),
  type: Joi.string().valid(...validTypes).optional().messages({
    'any.only': 'Type must be one of: client, vendor, both'
  }),
  registration_number: Joi.string().max(100).optional().allow(null, ''),
  tax_id: Joi.string().max(100).optional().allow(null, ''),
  contact_person: Joi.string().max(255).optional().allow(null, ''),
  email: Joi.string().email().optional().allow(null, '').messages({
    'string.email': 'Please provide a valid email address'
  }),
  phone: Joi.string().max(20).optional().allow(null, ''),
  address: Joi.string().optional().allow(null, ''),
  city: Joi.string().max(100).optional().allow(null, ''),
  state: Joi.string().max(100).optional().allow(null, ''),
  country: Joi.string().max(100).optional().allow(null, ''),
  postal_code: Joi.string().max(20).optional().allow(null, ''),
  payment_terms: Joi.string().max(50).optional().allow(null, ''),
  credit_limit: Joi.number().precision(2).optional().allow(null),
  currency: Joi.string().length(3).optional(),
  status: Joi.string().valid(...validStatuses).optional(),
  notes: Joi.string().optional().allow(null, '')
});

module.exports = {
  createSchema,
  updateSchema,
  validTypes,
  validStatuses
};
