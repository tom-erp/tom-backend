/**
 * Timesheet Service
 */

const BaseService = require('../base/base.service');
const TimesheetRepository = require('./timesheet.repository');

class TimesheetService extends BaseService {
  constructor() {
    super(new TimesheetRepository());
  }
}

module.exports = TimesheetService;
