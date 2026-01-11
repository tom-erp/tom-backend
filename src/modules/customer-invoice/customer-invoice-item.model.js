/**
 * Customer Invoice Item Model
 * Table: customer_invoice_items
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class CustomerInvoiceItemModel extends BaseModel {
  constructor() {
    super('customer_invoice_items', db);
  }

  /**
   * Find items by invoice
   */
  async findByInvoice(invoiceId) {
    return this.db('customer_invoice_items')
      .where({ invoice_id: invoiceId })
      .orderBy('sequence', 'asc');
  }

  /**
   * Create multiple items for an invoice
   */
  async createBulk(invoiceId, items) {
    const itemsToInsert = items.map((item, index) => ({
      invoice_id: invoiceId,
      item_id: item.item_id || null,
      item_code: item.item_code,
      item_description: item.item_description,
      quantity: item.quantity,
      unit_of_measure: item.unit_of_measure,
      unit_price: item.unit_price,
      line_total: item.quantity * item.unit_price,
      sequence: item.sequence || index + 1
    }));

    return this.db('customer_invoice_items')
      .insert(itemsToInsert)
      .returning('*');
  }

  /**
   * Delete all items for an invoice
   */
  async deleteByInvoice(invoiceId) {
    return this.db('customer_invoice_items')
      .where({ invoice_id: invoiceId })
      .del();
  }
}

module.exports = new CustomerInvoiceItemModel();
