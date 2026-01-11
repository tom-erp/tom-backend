/**
 * Project Schedule Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class Project_ScheduleRepository extends BaseModel {
  constructor() {
    super('project_schedules', db);
  }
}

module.exports = Project_ScheduleRepository;
