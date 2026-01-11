/**
 * Voucher Service
 */

const BaseService = require('../base/base.service');
const VoucherRepository = require('./voucher.repository');

class VoucherService extends BaseService {
  constructor() {
    super(new VoucherRepository());
  }
}

module.exports = VoucherService;
