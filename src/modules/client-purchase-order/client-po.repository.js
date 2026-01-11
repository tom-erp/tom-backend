/**
 * Client Purchase Order Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class Client_PoRepository extends BaseModel {
  constructor() {
    super('client_purchase_orders', db);
  }
}

module.exports = Client_PoRepository;
