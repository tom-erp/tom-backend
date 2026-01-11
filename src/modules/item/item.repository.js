/**
 * Item Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class ItemRepository extends BaseModel {
  constructor() {
    super('items', db);
  }
}

module.exports = ItemRepository;
