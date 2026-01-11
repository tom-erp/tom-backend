/**
 * Attendance Service
 */

const BaseService = require('../base/base.service');
const AttendanceRepository = require('./attendance.repository');

class AttendanceService extends BaseService {
  constructor() {
    super(new AttendanceRepository());
  }
}

module.exports = AttendanceService;
