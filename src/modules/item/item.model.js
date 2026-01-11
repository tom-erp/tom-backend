/**
 * Item Model
 * Table: items
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class ItemModel extends BaseModel {
  constructor() {
    super('items', db);
  }

  /**
   * Find items by category
   */
  async findByCategory(category) {
    return this.db('items')
      .where({ category })
      .whereNull('deleted_at');
  }

  /**
   * Find active items
   */
  async findActive() {
    return this.db('items')
      .where({ status: 'active' })
      .whereNull('deleted_at');
  }

  /**
   * Find by code
   */
  async findByCode(code) {
    return this.db('items')
      .where({ code })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Search items by name or code
   */
  async search(query) {
    return this.db('items')
      .where(function() {
        this.where('name', 'ilike', `%${query}%`)
          .orWhere('code', 'ilike', `%${query}%`);
      })
      .whereNull('deleted_at');
  }
}

module.exports = new ItemModel();
