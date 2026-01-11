/**
 * Auth Model
 * Table: users
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class AuthModel extends BaseModel {
  constructor() {
    super('users', db);
  }
}

module.exports = new AuthModel();
