/**
 * Vendor Bill Item Model
 * Table: vendor_bill_items
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class VendorBillItemModel extends BaseModel {
  constructor() {
    super('vendor_bill_items', db);
  }

  /**
   * Find items by bill
   */
  async findByBill(billId) {
    return this.db('vendor_bill_items')
      .where({ bill_id: billId })
      .orderBy('sequence', 'asc');
  }

  /**
   * Create multiple items for a bill
   */
  async createBulk(billId, items) {
    const itemsToInsert = items.map((item, index) => ({
      bill_id: billId,
      po_item_id: item.po_item_id || null,
      item_id: item.item_id || null,
      item_code: item.item_code,
      item_description: item.item_description,
      quantity: item.quantity,
      unit_price: item.unit_price,
      line_total: item.quantity * item.unit_price,
      sequence: item.sequence || index + 1
    }));

    return this.db('vendor_bill_items')
      .insert(itemsToInsert)
      .returning('*');
  }

  /**
   * Delete all items for a bill
   */
  async deleteByBill(billId) {
    return this.db('vendor_bill_items')
      .where({ bill_id: billId })
      .del();
  }
}

module.exports = new VendorBillItemModel();
