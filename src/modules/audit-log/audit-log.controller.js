/**
 * AuditLog Controller
 * HTTP request/response handling for audit logs
 */

const auditLogService = require('./audit-log.service');
const asyncHandler = require('../../utils/helpers/async-handler');

class AuditLogController {
  /**
   * Get all audit logs
   * GET /api/v1/audit-logs
   */
  getAll = asyncHandler(async (req, res) => {
    const filters = {
      user_id: req.query.user_id,
      action: req.query.action,
      entity_type: req.query.entity_type,
      entity_id: req.query.entity_id,
      start_date: req.query.start_date,
      end_date: req.query.end_date
    };

    const pagination = {
      limit: parseInt(req.query.limit) || 50,
      offset: parseInt(req.query.offset) || 0
    };

    const result = await auditLogService.findAll(filters, pagination);

    res.json({
      success: true,
      data: result.data,
      pagination: result.pagination
    });
  });

  /**
   * Get audit log by ID
   * GET /api/v1/audit-logs/:id
   */
  getById = asyncHandler(async (req, res) => {
    const log = await auditLogService.findById(req.params.id);

    res.json({
      success: true,
      data: log
    });
  });

  /**
   * Get audit logs by user
   * GET /api/v1/audit-logs/user/:userId
   */
  getByUser = asyncHandler(async (req, res) => {
    const pagination = {
      limit: parseInt(req.query.limit) || 50,
      offset: parseInt(req.query.offset) || 0
    };

    const result = await auditLogService.findByUser(req.params.userId, pagination);

    res.json({
      success: true,
      data: result.data,
      pagination: result.pagination
    });
  });

  /**
   * Get audit logs by entity
   * GET /api/v1/audit-logs/entity/:entityType/:entityId
   */
  getByEntity = asyncHandler(async (req, res) => {
    const pagination = {
      limit: parseInt(req.query.limit) || 50,
      offset: parseInt(req.query.offset) || 0
    };

    const result = await auditLogService.findByEntity(
      req.params.entityType,
      req.params.entityId,
      pagination
    );

    res.json({
      success: true,
      data: result.data,
      pagination: result.pagination
    });
  });
}

module.exports = new AuditLogController();
