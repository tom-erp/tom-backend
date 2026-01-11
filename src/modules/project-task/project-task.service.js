/**
 * Project Task Service
 */

const BaseService = require('../base/base.service');
const Project_TaskRepository = require('./project-task.repository');

class Project_TaskService extends BaseService {
  constructor() {
    super(new Project_TaskRepository());
  }
}

module.exports = Project_TaskService;
