/**
 * Customer Payment Controller
 */

const BaseController = require('../base/base.controller');
const Customer_PaymentService = require('./customer-payment.service');

class Customer_PaymentController extends BaseController {
  constructor() {
    super(new Customer_PaymentService());
  }
}

module.exports = new Customer_PaymentController();
