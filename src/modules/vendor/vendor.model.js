/**
 * Vendor Model
 * Table: vendors
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class VendorModel extends BaseModel {
  constructor() {
    super('vendors', db);
  }

  /**
   * Find vendors by type
   */
  async findByType(vendorType) {
    return this.db('vendors')
      .where({ vendor_type: vendorType })
      .whereNull('deleted_at');
  }

  /**
   * Find active vendors
   */
  async findActive() {
    return this.db('vendors')
      .where({ status: 'active' })
      .whereNull('deleted_at');
  }

  /**
   * Find vendor by code
   */
  async findByCode(vendorCode) {
    return this.db('vendors')
      .where({ vendor_code: vendorCode })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Find vendors by organization
   */
  async findByOrganization(organizationId) {
    return this.db('vendors')
      .where({ organization_id: organizationId })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Search vendors by name or code
   */
  async search(query) {
    return this.db('vendors')
      .where(function() {
        this.where('vendor_name', 'ilike', `%${query}%`)
          .orWhere('vendor_code', 'ilike', `%${query}%`);
      })
      .whereNull('deleted_at');
  }
}

module.exports = new VendorModel();
