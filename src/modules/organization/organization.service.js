/**
 * Organization Service
 */

const BaseService = require('../base/base.service');
const OrganizationRepository = require('./organization.repository');

class OrganizationService extends BaseService {
  constructor() {
    super(new OrganizationRepository());
  }
}

module.exports = OrganizationService;
