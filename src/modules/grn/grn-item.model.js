/**
 * GRN Item Model
 * Table: grn_items
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class GRNItemModel extends BaseModel {
  constructor() {
    super('grn_items', db);
  }

  /**
   * Find items by GRN
   */
  async findByGRN(grnId) {
    return this.db('grn_items')
      .where({ grn_id: grnId });
  }

  /**
   * Find item by GRN and PO item
   */
  async findByGRNAndPOItem(grnId, poItemId) {
    return this.db('grn_items')
      .where({ grn_id: grnId, po_item_id: poItemId })
      .first();
  }

  /**
   * Create multiple items for a GRN
   */
  async createBulk(grnId, items) {
    const itemsToInsert = items.map(item => ({
      grn_id: grnId,
      po_item_id: item.po_item_id,
      received_quantity: item.received_quantity,
      accepted_quantity: item.accepted_quantity || item.received_quantity,
      rejected_quantity: item.rejected_quantity || 0,
      condition_notes: item.condition_notes || null
    }));

    return this.db('grn_items')
      .insert(itemsToInsert)
      .returning('*');
  }

  /**
   * Delete all items for a GRN
   */
  async deleteByGRN(grnId) {
    return this.db('grn_items')
      .where({ grn_id: grnId })
      .del();
  }

  /**
   * Update accepted/rejected quantities
   */
  async updateQuantities(id, acceptedQuantity, rejectedQuantity) {
    return this.db('grn_items')
      .where({ id })
      .update({
        accepted_quantity: acceptedQuantity,
        rejected_quantity: rejectedQuantity
      })
      .returning('*');
  }
}

module.exports = new GRNItemModel();
