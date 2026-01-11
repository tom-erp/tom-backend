/**
 * Purchase Request Item Model
 * Table: purchase_request_items
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class PurchaseRequestItemModel extends BaseModel {
  constructor() {
    super('purchase_request_items', db);
  }

  /**
   * Find items by PR
   */
  async findByPR(prId) {
    return this.db('purchase_request_items')
      .where({ pr_id: prId })
      .orderBy('sequence', 'asc');
  }

  /**
   * Create multiple items for a PR
   */
  async createBulk(prId, items) {
    const itemsToInsert = items.map((item, index) => ({
      pr_id: prId,
      item_id: item.item_id || null,
      item_code: item.item_code,
      item_description: item.item_description,
      quantity: item.quantity,
      unit_of_measure: item.unit_of_measure,
      estimated_unit_price: item.estimated_unit_price || null,
      line_total: item.quantity * (item.estimated_unit_price || 0),
      budget_category: item.budget_category || null,
      sequence: item.sequence || index + 1
    }));

    return this.db('purchase_request_items')
      .insert(itemsToInsert)
      .returning('*');
  }

  /**
   * Delete all items for a PR
   */
  async deleteByPR(prId) {
    return this.db('purchase_request_items')
      .where({ pr_id: prId })
      .del();
  }

  /**
   * Calculate total for PR items
   */
  async calculateTotal(prId) {
    const result = await this.db('purchase_request_items')
      .where({ pr_id: prId })
      .sum('line_total as total')
      .first();
    return result ? parseFloat(result.total || 0) : 0;
  }
}

module.exports = new PurchaseRequestItemModel();
