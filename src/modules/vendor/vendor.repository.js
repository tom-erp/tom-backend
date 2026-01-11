/**
 * Vendor Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class VendorRepository extends BaseModel {
  constructor() {
    super('vendors', db);
  }
}

module.exports = VendorRepository;
