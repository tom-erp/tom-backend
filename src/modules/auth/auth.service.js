/**
 * Auth Service
 */

const BaseService = require('../base/base.service');
const AuthRepository = require('./auth.repository');

class AuthService extends BaseService {
  constructor() {
    super(new AuthRepository());
  }
}

module.exports = AuthService;
