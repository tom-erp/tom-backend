/**
 * Project Task Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class Project_TaskRepository extends BaseModel {
  constructor() {
    super('project_tasks', db);
  }
}

module.exports = Project_TaskRepository;
