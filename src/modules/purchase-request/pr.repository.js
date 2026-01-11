/**
 * Purchase Request Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class PrRepository extends BaseModel {
  constructor() {
    super('purchase_requests', db);
  }
}

module.exports = PrRepository;
