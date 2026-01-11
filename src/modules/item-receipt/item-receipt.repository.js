/**
 * Item Receipt Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class Item_ReceiptRepository extends BaseModel {
  constructor() {
    super('item_receipts', db);
  }
}

module.exports = Item_ReceiptRepository;
