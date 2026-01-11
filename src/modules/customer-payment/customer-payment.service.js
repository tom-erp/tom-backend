/**
 * Customer Payment Service
 */

const BaseService = require('../base/base.service');
const Customer_PaymentRepository = require('./customer-payment.repository');

class Customer_PaymentService extends BaseService {
  constructor() {
    super(new Customer_PaymentRepository());
  }
}

module.exports = Customer_PaymentService;
