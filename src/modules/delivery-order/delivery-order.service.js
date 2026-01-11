/**
 * Delivery Order Service
 */

const BaseService = require('../base/base.service');
const Delivery_OrderRepository = require('./delivery-order.repository');

class Delivery_OrderService extends BaseService {
  constructor() {
    super(new Delivery_OrderRepository());
  }
}

module.exports = Delivery_OrderService;
