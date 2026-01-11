/**
 * Organization Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class OrganizationRepository extends BaseModel {
  constructor() {
    super('organizations', db);
  }
}

module.exports = OrganizationRepository;
