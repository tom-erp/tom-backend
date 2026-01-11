/**
 * Vendor Prepayment Service
 */

const BaseService = require('../base/base.service');
const Vendor_PrepaymentRepository = require('./vendor-prepayment.repository');

class Vendor_PrepaymentService extends BaseService {
  constructor() {
    super(new Vendor_PrepaymentRepository());
  }
}

module.exports = Vendor_PrepaymentService;
