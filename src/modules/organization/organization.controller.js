/**
 * Organization Controller
 */

const BaseController = require('../base/base.controller');
const OrganizationService = require('./organization.service');

class OrganizationController extends BaseController {
  constructor() {
    super(new OrganizationService());
  }
}

module.exports = new OrganizationController();
