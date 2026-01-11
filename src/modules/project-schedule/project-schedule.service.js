/**
 * Project Schedule Service
 */

const BaseService = require('../base/base.service');
const Project_ScheduleRepository = require('./project-schedule.repository');

class Project_ScheduleService extends BaseService {
  constructor() {
    super(new Project_ScheduleRepository());
  }
}

module.exports = Project_ScheduleService;
