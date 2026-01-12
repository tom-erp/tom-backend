/**
 * AuditLog Repository
 * Database queries for audit logs
 */

const db = require('../../config/database');

class AuditLogRepository {
  /**
   * Create audit log entry
   */
  async create(data) {
    const [auditLog] = await db('audit_logs')
      .insert(data)
      .returning('*');
    return auditLog;
  }

  /**
   * Find audit logs with pagination
   */
  async findAll(filters = {}, pagination = {}) {
    const query = db('audit_logs')
      .select('audit_logs.*', 'users.email as user_email', 'users.first_name', 'users.last_name')
      .leftJoin('users', 'audit_logs.user_id', 'users.id')
      .orderBy('audit_logs.created_at', 'desc');

    if (filters.user_id) {
      query.where('audit_logs.user_id', filters.user_id);
    }

    if (filters.action) {
      query.where('audit_logs.action', filters.action);
    }

    if (filters.entity_type) {
      query.where('audit_logs.entity_type', filters.entity_type);
    }

    if (filters.entity_id) {
      query.where('audit_logs.entity_id', filters.entity_id);
    }

    if (filters.start_date && filters.end_date) {
      query.whereBetween('audit_logs.created_at', [filters.start_date, filters.end_date]);
    }

    if (pagination.limit) {
      query.limit(pagination.limit);
      if (pagination.offset) {
        query.offset(pagination.offset);
      }
    }

    return query;
  }

  /**
   * Find audit log by ID
   */
  async findById(id) {
    return db('audit_logs')
      .select('audit_logs.*', 'users.email as user_email', 'users.first_name', 'users.last_name')
      .leftJoin('users', 'audit_logs.user_id', 'users.id')
      .where('audit_logs.id', id)
      .first();
  }

  /**
   * Count audit logs
   */
  async count(filters = {}) {
    const query = db('audit_logs');

    if (filters.user_id) {
      query.where('user_id', filters.user_id);
    }

    if (filters.action) {
      query.where('action', filters.action);
    }

    if (filters.entity_type) {
      query.where('entity_type', filters.entity_type);
    }

    if (filters.start_date && filters.end_date) {
      query.whereBetween('created_at', [filters.start_date, filters.end_date]);
    }

    const [result] = await query.count('* as count');
    return parseInt(result.count);
  }
}

module.exports = new AuditLogRepository();
