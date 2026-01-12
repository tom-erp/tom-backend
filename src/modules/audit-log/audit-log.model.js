/**
 * AuditLog Model
 * Table: audit_logs
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class AuditLogModel extends BaseModel {
  constructor() {
    super('audit_logs', db);
  }

  /**
   * Find audit logs by user
   */
  async findByUser(userId, limit = 100) {
    return this.db('audit_logs')
      .where({ user_id: userId })
      .orderBy('created_at', 'desc')
      .limit(limit);
  }

  /**
   * Find audit logs by entity
   */
  async findByEntity(entityType, entityId) {
    return this.db('audit_logs')
      .where({ entity_type: entityType, entity_id: entityId })
      .orderBy('created_at', 'desc');
  }

  /**
   * Find audit logs by action
   */
  async findByAction(action, limit = 100) {
    return this.db('audit_logs')
      .where({ action })
      .orderBy('created_at', 'desc')
      .limit(limit);
  }

  /**
   * Find audit logs by date range
   */
  async findByDateRange(startDate, endDate, limit = 1000) {
    return this.db('audit_logs')
      .whereBetween('created_at', [startDate, endDate])
      .orderBy('created_at', 'desc')
      .limit(limit);
  }
}

module.exports = new AuditLogModel();
