/**
 * Timesheet Controller
 */

const BaseController = require('../base/base.controller');
const TimesheetService = require('./timesheet.service');

class TimesheetController extends BaseController {
  constructor() {
    super(new TimesheetService());
  }
}

module.exports = new TimesheetController();
