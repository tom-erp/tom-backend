/**
 * Project Service
 */

const BaseService = require('../base/base.service');
const ProjectRepository = require('./project.repository');

class ProjectService extends BaseService {
  constructor() {
    super(new ProjectRepository());
  }
}

module.exports = ProjectService;
