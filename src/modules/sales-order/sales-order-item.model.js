/**
 * Sales Order Item Model
 * Table: sales_order_items
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class SalesOrderItemModel extends BaseModel {
  constructor() {
    super('sales_order_items', db);
  }

  /**
   * Find items by sales order
   */
  async findBySalesOrder(salesOrderId) {
    return this.db('sales_order_items')
      .where({ sales_order_id: salesOrderId })
      .orderBy('sequence', 'asc');
  }

  /**
   * Create multiple items for a sales order
   */
  async createBulk(salesOrderId, items) {
    const itemsToInsert = items.map((item, index) => ({
      sales_order_id: salesOrderId,
      quotation_item_id: item.quotation_item_id || null,
      item_id: item.item_id || null,
      item_code: item.item_code,
      item_description: item.item_description,
      quantity: item.quantity,
      unit_of_measure: item.unit_of_measure,
      unit_price: item.unit_price,
      discount_percentage: item.discount_percentage || 0,
      discount_amount: item.discount_amount || 0,
      line_total: item.quantity * item.unit_price * (1 - (item.discount_percentage || 0) / 100),
      sequence: item.sequence || index + 1
    }));

    return this.db('sales_order_items')
      .insert(itemsToInsert)
      .returning('*');
  }

  /**
   * Delete all items for a sales order
   */
  async deleteBySalesOrder(salesOrderId) {
    return this.db('sales_order_items')
      .where({ sales_order_id: salesOrderId })
      .del();
  }

  /**
   * Update line total (recalculate)
   */
  async updateLineTotal(id, quantity, unitPrice, discountPercentage = 0) {
    const discountAmount = quantity * unitPrice * (discountPercentage / 100);
    const lineTotal = quantity * unitPrice - discountAmount;
    return this.db('sales_order_items')
      .where({ id })
      .update({
        quantity,
        unit_price: unitPrice,
        discount_percentage: discountPercentage,
        discount_amount: discountAmount,
        line_total: lineTotal
      })
      .returning('*');
  }
}

module.exports = new SalesOrderItemModel();
