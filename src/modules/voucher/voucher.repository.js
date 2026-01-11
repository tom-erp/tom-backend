/**
 * Voucher Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class VoucherRepository extends BaseModel {
  constructor() {
    super('vouchers', db);
  }
}

module.exports = VoucherRepository;
