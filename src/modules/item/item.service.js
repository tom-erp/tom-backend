/**
 * Item Service
 */

const BaseService = require('../base/base.service');
const ItemRepository = require('./item.repository');

class ItemService extends BaseService {
  constructor() {
    super(new ItemRepository());
  }
}

module.exports = ItemService;
