/**
 * WIP Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class WipRepository extends BaseModel {
  constructor() {
    super('work_in_progress', db);
  }
}

module.exports = WipRepository;
