/**
 * Notification Service
 */

const BaseService = require('../base/base.service');
const NotificationRepository = require('./notification.repository');

class NotificationService extends BaseService {
  constructor() {
    super(new NotificationRepository());
  }
}

module.exports = NotificationService;
