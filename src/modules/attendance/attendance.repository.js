/**
 * Attendance Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class AttendanceRepository extends BaseModel {
  constructor() {
    super('attendance', db);
  }
}

module.exports = AttendanceRepository;
