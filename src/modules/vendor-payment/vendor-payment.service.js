/**
 * Vendor Payment Service
 */

const BaseService = require('../base/base.service');
const Vendor_PaymentRepository = require('./vendor-payment.repository');

class Vendor_PaymentService extends BaseService {
  constructor() {
    super(new Vendor_PaymentRepository());
  }
}

module.exports = Vendor_PaymentService;
