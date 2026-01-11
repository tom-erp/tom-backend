/**
 * Item Receipt Service
 */

const BaseService = require('../base/base.service');
const Item_ReceiptRepository = require('./item-receipt.repository');

class Item_ReceiptService extends BaseService {
  constructor() {
    super(new Item_ReceiptRepository());
  }
}

module.exports = Item_ReceiptService;
