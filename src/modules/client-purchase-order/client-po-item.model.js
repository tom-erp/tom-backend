/**
 * Client Purchase Order Item Model
 * Table: client_purchase_order_items
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class ClientPurchaseOrderItemModel extends BaseModel {
  constructor() {
    super('client_purchase_order_items', db);
  }

  /**
   * Find items by client PO
   */
  async findByClientPO(clientPOId) {
    return this.db('client_purchase_order_items')
      .where({ client_po_id: clientPOId })
      .orderBy('sequence', 'asc');
  }

  /**
   * Create multiple items for a client PO
   */
  async createBulk(clientPOId, items) {
    const itemsToInsert = items.map((item, index) => ({
      client_po_id: clientPOId,
      quotation_item_id: item.quotation_item_id || null,
      item_id: item.item_id || null,
      item_code: item.item_code,
      item_description: item.item_description,
      quantity: item.quantity,
      unit_of_measure: item.unit_of_measure,
      unit_price: item.unit_price,
      line_total: item.quantity * item.unit_price,
      sequence: item.sequence || index + 1
    }));

    return this.db('client_purchase_order_items')
      .insert(itemsToInsert)
      .returning('*');
  }

  /**
   * Delete all items for a client PO
   */
  async deleteByClientPO(clientPOId) {
    return this.db('client_purchase_order_items')
      .where({ client_po_id: clientPOId })
      .del();
  }
}

module.exports = new ClientPurchaseOrderItemModel();
