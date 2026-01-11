/**
 * Vendor Prepayment Controller
 */

const BaseController = require('../base/base.controller');
const Vendor_PrepaymentService = require('./vendor-prepayment.service');

class Vendor_PrepaymentController extends BaseController {
  constructor() {
    super(new Vendor_PrepaymentService());
  }
}

module.exports = new Vendor_PrepaymentController();
