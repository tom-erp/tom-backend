/**
 * Delivery Order Controller
 */

const BaseController = require('../base/base.controller');
const Delivery_OrderService = require('./delivery-order.service');

class Delivery_OrderController extends BaseController {
  constructor() {
    super(new Delivery_OrderService());
  }
}

module.exports = new Delivery_OrderController();
