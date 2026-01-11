/**
 * Project Task Controller
 */

const BaseController = require('../base/base.controller');
const Project_TaskService = require('./project-task.service');

class Project_TaskController extends BaseController {
  constructor() {
    super(new Project_TaskService());
  }
}

module.exports = new Project_TaskController();
