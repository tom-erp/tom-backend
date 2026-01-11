/**
 * Organization Model
 * Table: organizations
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class OrganizationModel extends BaseModel {
  constructor() {
    super('organizations', db);
  }

  /**
   * Find organizations by type (client, vendor, both)
   */
  async findByType(type) {
    return this.db('organizations')
      .where({ type })
      .whereNull('deleted_at');
  }

  /**
   * Find active organizations
   */
  async findActive() {
    return this.db('organizations')
      .where({ status: 'active' })
      .whereNull('deleted_at');
  }

  /**
   * Find by code
   */
  async findByCode(code) {
    return this.db('organizations')
      .where({ code })
      .whereNull('deleted_at')
      .first();
  }
}

module.exports = new OrganizationModel();
