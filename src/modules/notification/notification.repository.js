/**
 * Notification Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class NotificationRepository extends BaseModel {
  constructor() {
    super('notifications', db);
  }
}

module.exports = NotificationRepository;
