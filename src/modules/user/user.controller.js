/**
 * User Controller
 */

const BaseController = require('../base/base.controller');
const UserService = require('./user.service');

class UserController extends BaseController {
  constructor() {
    super(new UserService());
  }
}

module.exports = new UserController();
