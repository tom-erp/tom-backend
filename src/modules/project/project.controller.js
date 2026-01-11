/**
 * Project Controller
 */

const BaseController = require('../base/base.controller');
const ProjectService = require('./project.service');

class ProjectController extends BaseController {
  constructor() {
    super(new ProjectService());
  }
}

module.exports = new ProjectController();
