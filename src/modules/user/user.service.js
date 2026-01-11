/**
 * User Service
 */

const BaseService = require('../base/base.service');
const UserRepository = require('./user.repository');

class UserService extends BaseService {
  constructor() {
    super(new UserRepository());
  }
}

module.exports = UserService;
