/**
 * Voucher Controller
 */

const BaseController = require('../base/base.controller');
const VoucherService = require('./voucher.service');

class VoucherController extends BaseController {
  constructor() {
    super(new VoucherService());
  }
}

module.exports = new VoucherController();
