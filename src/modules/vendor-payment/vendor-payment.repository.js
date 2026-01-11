/**
 * Vendor Payment Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class Vendor_PaymentRepository extends BaseModel {
  constructor() {
    super('vendor_payments', db);
  }
}

module.exports = Vendor_PaymentRepository;
