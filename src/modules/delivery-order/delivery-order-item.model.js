/**
 * Delivery Order Item Model
 * Table: delivery_order_items
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class DeliveryOrderItemModel extends BaseModel {
  constructor() {
    super('delivery_order_items', db);
  }

  /**
   * Find items by DO
   */
  async findByDO(doId) {
    return this.db('delivery_order_items')
      .where({ do_id: doId })
      .orderBy('sequence', 'asc');
  }

  /**
   * Create multiple items for a DO
   */
  async createBulk(doId, items) {
    const itemsToInsert = items.map((item, index) => ({
      do_id: doId,
      item_id: item.item_id || null,
      item_code: item.item_code,
      item_description: item.item_description,
      quantity: item.quantity,
      unit_of_measure: item.unit_of_measure,
      sequence: item.sequence || index + 1
    }));

    return this.db('delivery_order_items')
      .insert(itemsToInsert)
      .returning('*');
  }

  /**
   * Delete all items for a DO
   */
  async deleteByDO(doId) {
    return this.db('delivery_order_items')
      .where({ do_id: doId })
      .del();
  }
}

module.exports = new DeliveryOrderItemModel();
