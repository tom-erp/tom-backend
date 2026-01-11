/**
 * Attendance Controller
 */

const BaseController = require('../base/base.controller');
const AttendanceService = require('./attendance.service');

class AttendanceController extends BaseController {
  constructor() {
    super(new AttendanceService());
  }
}

module.exports = new AttendanceController();
