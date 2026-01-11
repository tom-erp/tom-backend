/**
 * Vendor Prepayment Model
 * Table: vendor_prepayments
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class VendorPrepaymentModel extends BaseModel {
  constructor() {
    super('vendor_prepayments', db);
  }

  /**
   * Find prepayments by PO
   */
  async findByPO(poId) {
    return this.db('vendor_prepayments')
      .where({ po_id: poId })
      .whereNull('deleted_at')
      .orderBy('prepayment_date', 'desc');
  }

  /**
   * Find prepayments by vendor
   */
  async findByVendor(vendorId) {
    return this.db('vendor_prepayments')
      .where({ vendor_id: vendorId })
      .whereNull('deleted_at')
      .orderBy('prepayment_date', 'desc');
  }

  /**
   * Find prepayment by prepayment number
   */
  async findByPrepaymentNumber(prepaymentNumber) {
    return this.db('vendor_prepayments')
      .where({ prepayment_number: prepaymentNumber })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Find prepayments by status
   */
  async findByStatus(status) {
    return this.db('vendor_prepayments')
      .where({ status })
      .whereNull('deleted_at')
      .orderBy('prepayment_date', 'desc');
  }

  /**
   * Find pending settlement prepayments
   */
  async findPendingSettlement() {
    return this.db('vendor_prepayments')
      .where({ status: 'paid' })
      .whereRaw('settled_amount < prepayment_amount')
      .whereNull('deleted_at')
      .orderBy('prepayment_date', 'asc');
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
    return this.db('vendor_prepayments')
      .where({ id })
      .whereNull('deleted_at')
      .update(updateData)
      .returning('*');
  }

  /**
   * Update settled amount
   */
  async updateSettledAmount(id, amount) {
    return this.db('vendor_prepayments')
      .where({ id })
      .whereNull('deleted_at')
      .update({
        settled_amount: this.db.raw('COALESCE(settled_amount, 0) + ?', [amount]),
        updated_at: this.db.fn.now()
      })
      .returning('*');
  }
}

module.exports = new VendorPrepaymentModel();
