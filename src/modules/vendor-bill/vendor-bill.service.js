/**
 * Vendor Bill Service
 */

const BaseService = require('../base/base.service');
const Vendor_BillRepository = require('./vendor-bill.repository');

class Vendor_BillService extends BaseService {
  constructor() {
    super(new Vendor_BillRepository());
  }
}

module.exports = Vendor_BillService;
