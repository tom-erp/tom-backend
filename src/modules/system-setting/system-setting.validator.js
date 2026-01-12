/**
 * SystemSetting Validator
 * Input validation schemas for system settings
 */

const Joi = require('joi');

const validTypes = ['string', 'number', 'boolean', 'json'];
const validCategories = ['general', 'email', 'payment', 'notification', 'security', 'ui', 'integration'];

const createSystemSetting = {
  body: Joi.object({
    key: Joi.string().max(100).required(),
    value: Joi.alternatives().try(
      Joi.string(),
      Joi.number(),
      Joi.boolean(),
      Joi.object()
    ).required(),
    type: Joi.string().valid(...validTypes).default('string'),
    category: Joi.string().max(100).valid(...validCategories).allow(null, ''),
    description: Joi.string().allow(null, ''),
    is_public: Joi.boolean().default(false)
  })
};

const updateSystemSetting = {
  body: Joi.object({
    key: Joi.string().max(100),
    value: Joi.alternatives().try(
      Joi.string(),
      Joi.number(),
      Joi.boolean(),
      Joi.object()
    ),
    type: Joi.string().valid(...validTypes),
    category: Joi.string().max(100).valid(...validCategories).allow(null, ''),
    description: Joi.string().allow(null, ''),
    is_public: Joi.boolean()
  })
};

const getSystemSettings = {
  query: Joi.object({
    category: Joi.string().max(100),
    is_public: Joi.string().valid('true', 'false')
  })
};

module.exports = {
  createSystemSetting,
  updateSystemSetting,
  getSystemSettings
};
