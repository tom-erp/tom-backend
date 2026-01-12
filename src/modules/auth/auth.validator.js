/**
 * Auth Validator
 * Validation schemas for authentication endpoints
 */

const Joi = require('joi');

const registerSchema = Joi.object({
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
  role: Joi.string().valid(
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
  ).optional(),
  organization_id: Joi.number().integer().optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required'
  })
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    'any.required': 'Refresh token is required'
  })
});

module.exports = {
  registerSchema,
  loginSchema,
  refreshTokenSchema
};
