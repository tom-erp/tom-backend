/**
 * User Validator
 * Validation schemas for user endpoints
 */

const Joi = require('joi');

const validRoles = [
  'admin',
  'sales_executive',
  'sales_manager',
  'project_manager',
  'procurement_officer',
  'site_engineer',
  'finance_officer',
  'qc_officer',
  'workshop_supervisor',
  'hr_officer'
];

const validStatuses = ['active', 'inactive', 'suspended'];

const createUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required'
  }),
  first_name: Joi.string().min(1).max(100).required().messages({
    'string.min': 'First name is required',
    'any.required': 'First name is required'
  }),
  last_name: Joi.string().min(1).max(100).required().messages({
    'string.min': 'Last name is required',
    'any.required': 'Last name is required'
  }),
  role: Joi.string().valid(...validRoles).required().messages({
    'any.only': 'Invalid role',
    'any.required': 'Role is required'
  }),
  organization_id: Joi.number().integer().optional(),
  phone: Joi.string().max(20).optional(),
  department: Joi.string().max(100).optional(),
  status: Joi.string().valid(...validStatuses).optional()
});

const updateUserSchema = Joi.object({
  email: Joi.string().email().optional().messages({
    'string.email': 'Please provide a valid email address'
  }),
  password: Joi.string().min(6).optional().messages({
    'string.min': 'Password must be at least 6 characters long'
  }),
  first_name: Joi.string().min(1).max(100).optional(),
  last_name: Joi.string().min(1).max(100).optional(),
  role: Joi.string().valid(...validRoles).optional().messages({
    'any.only': 'Invalid role'
  }),
  organization_id: Joi.number().integer().optional(),
  phone: Joi.string().max(20).optional().allow(null),
  department: Joi.string().max(100).optional().allow(null),
  status: Joi.string().valid(...validStatuses).optional()
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  validRoles,
  validStatuses
};
