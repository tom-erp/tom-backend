/**
 * Vendor Controller
 */

const BaseController = require('../base/base.controller');
const VendorService = require('./vendor.service');

class VendorController extends BaseController {
  constructor() {
    super(new VendorService());
  }
}

module.exports = new VendorController();
