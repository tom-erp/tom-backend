/**
 * Delivery Order Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class Delivery_OrderRepository extends BaseModel {
  constructor() {
    super('delivery_orders', db);
  }
}

module.exports = Delivery_OrderRepository;
