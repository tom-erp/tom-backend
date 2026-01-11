/**
 * Project Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class ProjectRepository extends BaseModel {
  constructor() {
    super('projects', db);
  }
}

module.exports = ProjectRepository;
