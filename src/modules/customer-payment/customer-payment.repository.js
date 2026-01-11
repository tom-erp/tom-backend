/**
 * Customer Payment Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class Customer_PaymentRepository extends BaseModel {
  constructor() {
    super('customer_payments', db);
  }
}

module.exports = Customer_PaymentRepository;
