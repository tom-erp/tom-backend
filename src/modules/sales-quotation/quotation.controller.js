/**
 * Sales Quotation Controller
 */

const BaseController = require('../base/base.controller');
const QuotationService = require('./quotation.service');

class QuotationController extends BaseController {
  constructor() {
    super(new QuotationService());
  }
}

module.exports = new QuotationController();
