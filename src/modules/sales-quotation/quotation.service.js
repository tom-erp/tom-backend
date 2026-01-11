/**
 * Sales Quotation Service
 */

const BaseService = require('../base/base.service');
const QuotationRepository = require('./quotation.repository');

class QuotationService extends BaseService {
  constructor() {
    super(new QuotationRepository());
  }
}

module.exports = QuotationService;
