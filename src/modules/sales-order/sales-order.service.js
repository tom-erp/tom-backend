/**
 * Sales Order Service
 */

const BaseService = require('../base/base.service');
const Sales_OrderRepository = require('./sales-order.repository');

class Sales_OrderService extends BaseService {
  constructor() {
    super(new Sales_OrderRepository());
  }
}

module.exports = Sales_OrderService;
