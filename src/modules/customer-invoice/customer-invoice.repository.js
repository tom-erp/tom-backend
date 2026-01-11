/**
 * Customer Invoice Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class Customer_InvoiceRepository extends BaseModel {
  constructor() {
    super('customer_invoices', db);
  }
}

module.exports = Customer_InvoiceRepository;
