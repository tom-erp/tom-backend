/**
 * Timesheet Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class TimesheetRepository extends BaseModel {
  constructor() {
    super('timesheets', db);
  }
}

module.exports = TimesheetRepository;
