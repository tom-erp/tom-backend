/**
 * Vendor Bill Model
 * Table: vendor_bills
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class VendorBillModel extends BaseModel {
  constructor() {
    super('vendor_bills', db);
  }

  /**
   * Find bills by PO
   */
  async findByPO(poId) {
    return this.db('vendor_bills')
      .where({ po_id: poId })
      .whereNull('deleted_at')
      .orderBy('invoice_date', 'desc');
  }

  /**
   * Find bills by vendor
   */
  async findByVendor(vendorId) {
    return this.db('vendor_bills')
      .where({ vendor_id: vendorId })
      .whereNull('deleted_at')
      .orderBy('invoice_date', 'desc');
  }

  /**
   * Find bill by bill number
   */
  async findByBillNumber(billNumber) {
    return this.db('vendor_bills')
      .where({ bill_number: billNumber })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Find bill by invoice number
   */
  async findByInvoiceNumber(invoiceNumber) {
    return this.db('vendor_bills')
      .where({ invoice_number: invoiceNumber })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Find bills by status
   */
  async findByStatus(status) {
    return this.db('vendor_bills')
      .where({ status })
      .whereNull('deleted_at')
      .orderBy('invoice_date', 'desc');
  }

  /**
   * Find overdue bills
   */
  async findOverdue() {
    return this.db('vendor_bills')
      .where('due_date', '<', this.db.fn.now())
      .whereIn('status', ['approved', 'partially_paid'])
      .whereNull('deleted_at')
      .orderBy('due_date', 'asc');
  }

  /**
   * Find pending payment bills
   */
  async findPendingPayment() {
    return this.db('vendor_bills')
      .whereIn('status', ['approved', 'partially_paid'])
      .whereNull('deleted_at')
      .orderBy('due_date', 'asc');
  }

  /**
   * Update status
   */
  async updateStatus(id, status, updatedBy = null) {
    const updateData = {
      status,
      updated_at: this.db.fn.now()
    };
    if (updatedBy) {
      updateData.updated_by = updatedBy;
    }
    if (status === 'approved') {
      updateData.approved_at = this.db.fn.now();
      updateData.approved_by = updatedBy;
    }
    return this.db('vendor_bills')
      .where({ id })
      .whereNull('deleted_at')
      .update(updateData)
      .returning('*');
  }

  /**
   * Update paid amount
   */
  async updatePaidAmount(id, amount) {
    return this.db('vendor_bills')
      .where({ id })
      .whereNull('deleted_at')
      .update({
        paid_amount: this.db.raw('COALESCE(paid_amount, 0) + ?', [amount]),
        status: this.db.raw(`CASE 
          WHEN (total_amount - COALESCE(paid_amount, 0) - ?) <= 0 THEN 'paid'
          WHEN (total_amount - COALESCE(paid_amount, 0) - ?) > 0 THEN 'partially_paid'
          ELSE status
        END`, [amount, amount]),
        updated_at: this.db.fn.now()
      })
      .returning('*');
  }

  /**
   * Find bill with items
   */
  async findWithItems(id) {
    const bill = await this.findById(id);
    if (!bill) return null;

    const items = await this.db('vendor_bill_items')
      .where({ bill_id: id })
      .orderBy('sequence', 'asc');

    return {
      ...bill,
      items
    };
  }

  /**
   * Check for duplicate invoice
   */
  async isDuplicateInvoice(poId, invoiceNumber, excludeId = null) {
    const query = this.db('vendor_bills')
      .where({ po_id: poId, invoice_number: invoiceNumber })
      .whereNull('deleted_at');
    
    if (excludeId) {
      query.whereNot({ id: excludeId });
    }
    
    const result = await query.first();
    return !!result;
  }
}

module.exports = new VendorBillModel();
