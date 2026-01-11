/**
 * Sales Quotation Item Model
 * Table: sales_quotation_items
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class SalesQuotationItemModel extends BaseModel {
  constructor() {
    super('sales_quotation_items', db);
  }

  /**
   * Find items by quotation
   */
  async findByQuotation(quotationId) {
    return this.db('sales_quotation_items')
      .where({ quotation_id: quotationId })
      .orderBy('sequence', 'asc');
  }

  /**
   * Find item by quotation and item
   */
  async findByQuotationAndItem(quotationId, itemId) {
    return this.db('sales_quotation_items')
      .where({ quotation_id: quotationId, item_id: itemId })
      .first();
  }

  /**
   * Create multiple items for a quotation
   */
  async createBulk(quotationId, items) {
    const itemsToInsert = items.map((item, index) => ({
      quotation_id: quotationId,
      item_id: item.item_id,
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unit_price,
      discount_percent: item.discount_percent || 0,
      line_total: item.quantity * item.unit_price * (1 - (item.discount_percent || 0) / 100),
      sequence: item.sequence || index + 1,
      notes: item.notes || null
    }));

    return this.db('sales_quotation_items')
      .insert(itemsToInsert)
      .returning('*');
  }

  /**
   * Delete all items for a quotation
   */
  async deleteByQuotation(quotationId) {
    return this.db('sales_quotation_items')
      .where({ quotation_id: quotationId })
      .del();
  }

  /**
   * Update line total (recalculate)
   */
  async updateLineTotal(id, quantity, unitPrice, discountPercent = 0) {
    const lineTotal = quantity * unitPrice * (1 - discountPercent / 100);
    return this.db('sales_quotation_items')
      .where({ id })
      .update({
        quantity,
        unit_price: unitPrice,
        discount_percent: discountPercent,
        line_total: lineTotal
      })
      .returning('*');
  }
}

module.exports = new SalesQuotationItemModel();
