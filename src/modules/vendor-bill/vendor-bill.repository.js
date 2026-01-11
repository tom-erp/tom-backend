/**
 * Vendor Bill Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class Vendor_BillRepository extends BaseModel {
  constructor() {
    super('vendor_bills', db);
  }
}

module.exports = Vendor_BillRepository;
