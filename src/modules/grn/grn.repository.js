/**
 * GRN Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class GrnRepository extends BaseModel {
  constructor() {
    super('goods_received_notes', db);
  }
}

module.exports = GrnRepository;
