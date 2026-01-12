/**
 * Client Purchase Order Validator
 */

const Joi = require('joi');

const createSchema = Joi.object({
  client_po_number: Joi.string().max(50).required(),
  internal_po_number: Joi.string().max(50).required(),
  quotation_id: Joi.number().integer().positive().allow(null),
  enquiry_id: Joi.number().integer().positive().allow(null),
  client_id: Joi.number().integer().positive().required(),
  project_id: Joi.number().integer().positive().allow(null),
  po_date: Joi.date().required(),
  received_date: Joi.date().allow(null),
  project_site: Joi.string().max(255).allow(null, ''),
  project_scope: Joi.string().allow(null, ''),
  total_value: Joi.number().precision(2).positive().required(),
  tax_percentage: Joi.number().precision(2).min(0).max(100).default(0),
  tax_amount: Joi.number().precision(2).min(0).default(0),
  currency: Joi.string().length(3).default('SGD'),
  status: Joi.string().valid(
    'received', 'under_review', 'validated', 'acknowledged', 'approved', 'rejected', 'converted'
  ).default('received'),
  validation_status: Joi.string().valid('complete', 'incomplete', 'discrepancy').allow(null),
  acknowledgement_sent: Joi.boolean().default(false),
  acknowledgement_date: Joi.date().allow(null),
  duplicate_flag: Joi.boolean().default(false),
  approved_by: Joi.number().integer().positive().allow(null),
  approved_at: Joi.date().allow(null),
  rejected_reason: Joi.string().allow(null, ''),
  notes: Joi.string().allow(null, ''),
  created_by: Joi.number().integer().positive().allow(null),
  items: Joi.array().items(
    Joi.object({
      quotation_item_id: Joi.number().integer().positive().allow(null),
      item_id: Joi.number().integer().positive().allow(null),
      item_code: Joi.string().required(),
      item_description: Joi.string().required(),
      quantity: Joi.number().positive().required(),
      unit_of_measure: Joi.string().required(),
      unit_price: Joi.number().precision(2).positive().required(),
      sequence: Joi.number().integer().positive().allow(null)
    })
  ).allow(null)
});

const updateSchema = Joi.object({
  client_po_number: Joi.string().max(50),
  internal_po_number: Joi.string().max(50),
  quotation_id: Joi.number().integer().positive().allow(null),
  enquiry_id: Joi.number().integer().positive().allow(null),
  client_id: Joi.number().integer().positive(),
  project_id: Joi.number().integer().positive().allow(null),
  po_date: Joi.date(),
  received_date: Joi.date().allow(null),
  project_site: Joi.string().max(255).allow(null, ''),
  project_scope: Joi.string().allow(null, ''),
  total_value: Joi.number().precision(2).positive(),
  tax_percentage: Joi.number().precision(2).min(0).max(100),
  tax_amount: Joi.number().precision(2).min(0),
  currency: Joi.string().length(3),
  status: Joi.string().valid(
    'received', 'under_review', 'validated', 'acknowledged', 'approved', 'rejected', 'converted'
  ),
  validation_status: Joi.string().valid('complete', 'incomplete', 'discrepancy').allow(null),
  acknowledgement_sent: Joi.boolean(),
  acknowledgement_date: Joi.date().allow(null),
  duplicate_flag: Joi.boolean(),
  approved_by: Joi.number().integer().positive().allow(null),
  approved_at: Joi.date().allow(null),
  rejected_reason: Joi.string().allow(null, ''),
  notes: Joi.string().allow(null, ''),
  items: Joi.array().items(
    Joi.object({
      quotation_item_id: Joi.number().integer().positive().allow(null),
      item_id: Joi.number().integer().positive().allow(null),
      item_code: Joi.string().required(),
      item_description: Joi.string().required(),
      quantity: Joi.number().positive().required(),
      unit_of_measure: Joi.string().required(),
      unit_price: Joi.number().precision(2).positive().required(),
      sequence: Joi.number().integer().positive().allow(null)
    })
  ).allow(null)
});

const acknowledgeSchema = Joi.object({
  acknowledgedBy: Joi.number().integer().positive().required()
});

const statusUpdateSchema = Joi.object({
  status: Joi.string().valid(
    'received', 'under_review', 'validated', 'acknowledged', 'approved', 'rejected', 'converted'
  ).required(),
  updatedBy: Joi.number().integer().positive().allow(null)
});

module.exports = {
  createSchema,
  updateSchema,
  acknowledgeSchema,
  statusUpdateSchema
};
