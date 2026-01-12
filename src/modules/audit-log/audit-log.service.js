/**
 * AuditLog Service
 * Business logic for audit logs
 */

const auditLogRepository = require('./audit-log.repository');
const AppError = require('../../utils/errors/AppError');

class AuditLogService {
  /**
   * Create audit log entry
   */
  async create(data) {
    return auditLogRepository.create(data);
  }

  /**
   * Find all audit logs with filters and pagination
   */
  async findAll(filters = {}, pagination = {}) {
    const limit = pagination.limit || 50;
    const offset = pagination.offset || 0;

    const [logs, total] = await Promise.all([
      auditLogRepository.findAll(filters, { limit, offset }),
      auditLogRepository.count(filters)
    ]);

    return {
      data: logs,
      pagination: {
        total,
        limit,
        offset,
        page: Math.floor(offset / limit) + 1,
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Find audit log by ID
   */
  async findById(id) {
    const log = await auditLogRepository.findById(id);
    if (!log) {
      throw new AppError('Audit log not found', 404);
    }
    return log;
  }

  /**
   * Find audit logs by user
   */
  async findByUser(userId, pagination = {}) {
    return this.findAll({ user_id: userId }, pagination);
  }

  /**
   * Find audit logs by entity
   */
  async findByEntity(entityType, entityId, pagination = {}) {
    return this.findAll({ entity_type: entityType, entity_id: entityId }, pagination);
  }

  /**
   * Find audit logs by action
   */
  async findByAction(action, pagination = {}) {
    return this.findAll({ action }, pagination);
  }

  /**
   * Find audit logs by date range
   */
  async findByDateRange(startDate, endDate, pagination = {}) {
    return this.findAll({ start_date: startDate, end_date: endDate }, pagination);
  }
}

module.exports = new AuditLogService();
