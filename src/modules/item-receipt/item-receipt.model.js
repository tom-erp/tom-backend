/**
 * Item Receipt Model
 * Table: item_receipts
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class ItemReceiptModel extends BaseModel {
  constructor() {
    super('item_receipts', db);
  }

  /**
   * Find receipts by PO
   */
  async findByPO(poId) {
    return this.db('item_receipts')
      .where({ po_id: poId })
      .whereNull('deleted_at')
      .orderBy('receipt_date', 'desc');
  }

  /**
   * Find receipt by receipt number
   */
  async findByReceiptNumber(receiptNumber) {
    return this.db('item_receipts')
      .where({ receipt_number: receiptNumber })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Find receipts by status
   */
  async findByStatus(receiptStatus) {
    return this.db('item_receipts')
      .where({ receipt_status: receiptStatus })
      .whereNull('deleted_at')
      .orderBy('receipt_date', 'desc');
  }

  /**
   * Find receipts requiring DO
   */
  async findRequiringDO() {
    return this.db('item_receipts')
      .where({ do_required: true, do_created: false })
      .whereNull('deleted_at')
      .orderBy('receipt_date', 'asc');
  }

  /**
   * Mark DO as created
   */
  async markDOCreated(id, doId) {
    return this.db('item_receipts')
      .where({ id })
      .whereNull('deleted_at')
      .update({
        do_created: true,
        do_id: doId,
        updated_at: this.db.fn.now()
      })
      .returning('*');
  }

  /**
   * Update status
   */
  async updateStatus(id, receiptStatus) {
    return this.db('item_receipts')
      .where({ id })
      .whereNull('deleted_at')
      .update({
        receipt_status: receiptStatus,
        updated_at: this.db.fn.now()
      })
      .returning('*');
  }

  /**
   * Find receipt with items
   */
  async findWithItems(id) {
    const receipt = await this.findById(id);
    if (!receipt) return null;

    const items = await this.db('item_receipt_items')
      .where({ item_receipt_id: id });

    return {
      ...receipt,
      items
    };
  }
}

module.exports = new ItemReceiptModel();
