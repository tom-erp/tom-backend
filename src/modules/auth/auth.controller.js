/**
 * Auth Controller
 */

const BaseController = require('../base/base.controller');
const AuthService = require('./auth.service');

class AuthController extends BaseController {
  constructor() {
    super(new AuthService());
  }
}

module.exports = new AuthController();
