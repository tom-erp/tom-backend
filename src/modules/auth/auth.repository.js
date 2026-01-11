/**
 * Auth Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class AuthRepository extends BaseModel {
  constructor() {
    super('users', db);
  }
}

module.exports = AuthRepository;
