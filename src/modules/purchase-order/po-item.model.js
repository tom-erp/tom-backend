/**
 * Purchase Order Item Model
 * Table: purchase_order_items
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class PurchaseOrderItemModel extends BaseModel {
  constructor() {
    super('purchase_order_items', db);
  }

  /**
   * Find items by PO
   */
  async findByPO(poId) {
    return this.db('purchase_order_items')
      .where({ po_id: poId })
      .orderBy('sequence', 'asc');
  }

  /**
   * Create multiple items for a PO
   */
  async createBulk(poId, items) {
    const itemsToInsert = items.map((item, index) => ({
      po_id: poId,
      item_id: item.item_id || null,
      item_code: item.item_code,
      item_description: item.item_description,
      quantity: item.quantity,
      unit_of_measure: item.unit_of_measure,
      unit_price: item.unit_price,
      line_total: item.quantity * item.unit_price,
      received_quantity: 0,
      sequence: item.sequence || index + 1
    }));

    return this.db('purchase_order_items')
      .insert(itemsToInsert)
      .returning('*');
  }

  /**
   * Delete all items for a PO
   */
  async deleteByPO(poId) {
    return this.db('purchase_order_items')
      .where({ po_id: poId })
      .del();
  }

  /**
   * Update received quantity
   */
  async updateReceivedQuantity(id, receivedQuantity) {
    return this.db('purchase_order_items')
      .where({ id })
      .update({
        received_quantity: receivedQuantity,
        updated_at: this.db.fn.now()
      })
      .returning('*');
  }

  /**
   * Get items pending receipt
   */
  async findPendingReceipt(poId) {
    return this.db('purchase_order_items')
      .where({ po_id: poId })
      .whereRaw('received_quantity < quantity')
      .orderBy('sequence', 'asc');
  }
}

module.exports = new PurchaseOrderItemModel();
