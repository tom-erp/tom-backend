/**
 * Item Receipt Item Model
 * Table: item_receipt_items
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class ItemReceiptItemModel extends BaseModel {
  constructor() {
    super('item_receipt_items', db);
  }

  /**
   * Find items by receipt
   */
  async findByReceipt(itemReceiptId) {
    return this.db('item_receipt_items')
      .where({ item_receipt_id: itemReceiptId });
  }

  /**
   * Create multiple items for a receipt
   */
  async createBulk(itemReceiptId, items) {
    const itemsToInsert = items.map(item => ({
      item_receipt_id: itemReceiptId,
      po_item_id: item.po_item_id || null,
      item_id: item.item_id || null,
      item_code: item.item_code,
      item_description: item.item_description,
      quantity_received: item.quantity_received,
      condition: item.condition || 'good',
      notes: item.notes || null
    }));

    return this.db('item_receipt_items')
      .insert(itemsToInsert)
      .returning('*');
  }

  /**
   * Delete all items for a receipt
   */
  async deleteByReceipt(itemReceiptId) {
    return this.db('item_receipt_items')
      .where({ item_receipt_id: itemReceiptId })
      .del();
  }
}

module.exports = new ItemReceiptItemModel();
