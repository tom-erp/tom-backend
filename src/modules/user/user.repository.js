/**
 * User Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class UserRepository extends BaseModel {
  constructor() {
    super('users', db);
  }
}

module.exports = UserRepository;
