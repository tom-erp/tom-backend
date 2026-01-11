/**
 * Sales Order Controller
 */

const BaseController = require('../base/base.controller');
const Sales_OrderService = require('./sales-order.service');

class Sales_OrderController extends BaseController {
  constructor() {
    super(new Sales_OrderService());
  }
}

module.exports = new Sales_OrderController();
