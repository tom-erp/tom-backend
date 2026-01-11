/**
 * Customer Invoice Service
 */

const BaseService = require('../base/base.service');
const Customer_InvoiceRepository = require('./customer-invoice.repository');

class Customer_InvoiceService extends BaseService {
  constructor() {
    super(new Customer_InvoiceRepository());
  }
}

module.exports = Customer_InvoiceService;
