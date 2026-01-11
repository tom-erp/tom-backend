/**
 * Sales Order Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class Sales_OrderRepository extends BaseModel {
  constructor() {
    super('sales_orders', db);
  }
}

module.exports = Sales_OrderRepository;
