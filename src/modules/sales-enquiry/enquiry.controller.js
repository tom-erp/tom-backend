/**
 * Sales Enquiry Controller
 */

const BaseController = require('../base/base.controller');
const EnquiryService = require('./enquiry.service');

class EnquiryController extends BaseController {
  constructor() {
    super(new EnquiryService());
  }
}

module.exports = new EnquiryController();
