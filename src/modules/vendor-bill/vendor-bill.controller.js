/**
 * Vendor Bill Controller
 */

const BaseController = require('../base/base.controller');
const Vendor_BillService = require('./vendor-bill.service');

class Vendor_BillController extends BaseController {
  constructor() {
    super(new Vendor_BillService());
  }
}

module.exports = new Vendor_BillController();
