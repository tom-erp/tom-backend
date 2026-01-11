/**
 * Customer Invoice Controller
 */

const BaseController = require('../base/base.controller');
const Customer_InvoiceService = require('./customer-invoice.service');

class Customer_InvoiceController extends BaseController {
  constructor() {
    super(new Customer_InvoiceService());
  }
}

module.exports = new Customer_InvoiceController();
