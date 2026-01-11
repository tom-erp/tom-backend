/**
 * Project Schedule Controller
 */

const BaseController = require('../base/base.controller');
const Project_ScheduleService = require('./project-schedule.service');

class Project_ScheduleController extends BaseController {
  constructor() {
    super(new Project_ScheduleService());
  }
}

module.exports = new Project_ScheduleController();
