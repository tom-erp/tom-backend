/**
 * Sales Quotation Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class QuotationRepository extends BaseModel {
  constructor() {
    super('sales_quotations', db);
  }
}

module.exports = QuotationRepository;
