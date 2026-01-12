/**
 * AuditLog Routes
 * Route definitions for audit logs
 */

const express = require('express');
const router = express.Router();
const auditLogController = require('./audit-log.controller');
const { validate } = require('../../middlewares/validator.middleware');
const { authenticate } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/authorization.middleware');
const auditLogValidator = require('./audit-log.validator');

// All routes require authentication
router.use(authenticate);

// Get all audit logs (admin only)
router.get(
  '/',
  authorize(['admin']),
  validate(auditLogValidator.getAuditLogs),
  auditLogController.getAll
);

// Get audit log by ID
router.get(
  '/:id',
  authorize(['admin']),
  auditLogController.getById
);

// Get audit logs by user
router.get(
  '/user/:userId',
  authorize(['admin']),
  validate(auditLogValidator.getAuditLogs),
  auditLogController.getByUser
);

// Get audit logs by entity
router.get(
  '/entity/:entityType/:entityId',
  authorize(['admin']),
  validate(auditLogValidator.getAuditLogs),
  auditLogController.getByEntity
);

module.exports = router;
