/**
 * Vendor Prepayment Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class Vendor_PrepaymentRepository extends BaseModel {
  constructor() {
    super('vendor_prepayments', db);
  }
}

module.exports = Vendor_PrepaymentRepository;
