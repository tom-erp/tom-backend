/**
 * Purchase Order Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class PoRepository extends BaseModel {
  constructor() {
    super('purchase_orders', db);
  }
}

module.exports = PoRepository;
