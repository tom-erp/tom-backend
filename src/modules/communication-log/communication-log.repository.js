/**
 * Communication Log Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class Communication_LogRepository extends BaseModel {
  constructor() {
    super('communication_logs', db);
  }
}

module.exports = Communication_LogRepository;
