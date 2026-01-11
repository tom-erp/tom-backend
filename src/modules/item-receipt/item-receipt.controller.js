/**
 * Item Receipt Controller
 */

const BaseController = require('../base/base.controller');
const Item_ReceiptService = require('./item-receipt.service');

class Item_ReceiptController extends BaseController {
  constructor() {
    super(new Item_ReceiptService());
  }
}

module.exports = new Item_ReceiptController();
