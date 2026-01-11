/**
 * Notification Model
 * Table: notifications
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class NotificationModel extends BaseModel {
  constructor() {
    super('notifications', db);
  }

  /**
   * Find notifications by user
   */
  async findByUser(userId) {
    return this.db('notifications')
      .where({ user_id: userId })
      .orderBy('created_at', 'desc');
  }

  /**
   * Find unread notifications by user
   */
  async findUnreadByUser(userId) {
    return this.db('notifications')
      .where({ user_id: userId, read: false })
      .orderBy('created_at', 'desc');
  }

  /**
   * Find notifications by type
   */
  async findByType(userId, notificationType) {
    return this.db('notifications')
      .where({ user_id: userId, notification_type: notificationType })
      .orderBy('created_at', 'desc');
  }

  /**
   * Find notifications by entity
   */
  async findByEntity(entityType, entityId) {
    return this.db('notifications')
      .where({ entity_type: entityType, entity_id: entityId })
      .orderBy('created_at', 'desc');
  }

  /**
   * Mark as read
   */
  async markAsRead(id) {
    return this.db('notifications')
      .where({ id })
      .update({
        read: true,
        read_at: this.db.fn.now()
      })
      .returning('*');
  }

  /**
   * Mark all as read for user
   */
  async markAllAsRead(userId) {
    return this.db('notifications')
      .where({ user_id: userId, read: false })
      .update({
        read: true,
        read_at: this.db.fn.now()
      });
  }

  /**
   * Get unread count for user
   */
  async getUnreadCount(userId) {
    const result = await this.db('notifications')
      .where({ user_id: userId, read: false })
      .count('* as count')
      .first();
    return parseInt(result.count || 0);
  }
}

module.exports = new NotificationModel();
