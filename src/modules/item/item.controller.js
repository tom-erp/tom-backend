/**
 * Item Controller
 */

const BaseController = require('../base/base.controller');
const ItemService = require('./item.service');

class ItemController extends BaseController {
  constructor() {
    super(new ItemService());
  }
}

module.exports = new ItemController();
