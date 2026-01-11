/**
 * Vendor Service
 */

const BaseService = require('../base/base.service');
const VendorRepository = require('./vendor.repository');

class VendorService extends BaseService {
  constructor() {
    super(new VendorRepository());
  }
}

module.exports = VendorService;
