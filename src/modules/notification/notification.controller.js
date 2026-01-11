/**
 * Notification Controller
 */

const BaseController = require('../base/base.controller');
const NotificationService = require('./notification.service');

class NotificationController extends BaseController {
  constructor() {
    super(new NotificationService());
  }
}

module.exports = new NotificationController();
