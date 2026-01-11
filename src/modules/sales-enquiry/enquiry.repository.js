/**
 * Sales Enquiry Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class EnquiryRepository extends BaseModel {
  constructor() {
    super('sales_enquiries', db);
  }
}

module.exports = EnquiryRepository;
