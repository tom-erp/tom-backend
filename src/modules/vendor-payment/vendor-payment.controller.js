/**
 * Vendor Payment Controller
 */

const BaseController = require('../base/base.controller');
const Vendor_PaymentService = require('./vendor-payment.service');

class Vendor_PaymentController extends BaseController {
  constructor() {
    super(new Vendor_PaymentService());
  }
}

module.exports = new Vendor_PaymentController();
