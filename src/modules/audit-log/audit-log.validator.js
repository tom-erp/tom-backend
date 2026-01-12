/**
 * AuditLog Validator
 * Input validation schemas for audit logs
 */

const Joi = require('joi');

const validActions = ['create', 'update', 'delete', 'view', 'login', 'logout'];

const createAuditLog = {
  body: Joi.object({
    user_id: Joi.number().integer().allow(null),
    action: Joi.string().valid(...validActions).required(),
    entity_type: Joi.string().required(),
    entity_id: Joi.number().integer().allow(null),
    old_values: Joi.object().allow(null),
    new_values: Joi.object().allow(null),
    ip_address: Joi.string().max(45).allow(null, ''),
    user_agent: Joi.string().allow(null, '')
  })
};

const getAuditLogs = {
  query: Joi.object({
    user_id: Joi.number().integer(),
    action: Joi.string().valid(...validActions),
    entity_type: Joi.string(),
    entity_id: Joi.number().integer(),
    start_date: Joi.date().iso(),
    end_date: Joi.date().iso().min(Joi.ref('start_date')),
    limit: Joi.number().integer().min(1).max(1000).default(50),
    offset: Joi.number().integer().min(0).default(0)
  })
};

module.exports = {
  createAuditLog,
  getAuditLogs
};
