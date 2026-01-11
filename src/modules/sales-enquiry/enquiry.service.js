/**
 * Sales Enquiry Service
 */

const BaseService = require('../base/base.service');
const EnquiryRepository = require('./enquiry.repository');

class EnquiryService extends BaseService {
  constructor() {
    super(new EnquiryRepository());
  }
}

module.exports = EnquiryService;
