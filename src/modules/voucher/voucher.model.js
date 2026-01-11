/**
 * Voucher Model
 * Table: vouchers
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class VoucherModel extends BaseModel {
  constructor() {
    super('vouchers', db);
  }

  /**
   * Find vouchers by vendor payment
   */
  async findByVendorPayment(vendorPaymentId) {
    return this.db('vouchers')
      .where({ vendor_payment_id: vendorPaymentId })
      .whereNull('deleted_at')
      .orderBy('voucher_date', 'desc');
  }

  /**
   * Find voucher by voucher number
   */
  async findByVoucherNumber(voucherNumber) {
    return this.db('vouchers')
      .where({ voucher_number: voucherNumber })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Find vouchers by status
   */
  async findByStatus(status) {
    return this.db('vouchers')
      .where({ status })
      .whereNull('deleted_at')
      .orderBy('voucher_date', 'desc');
  }

  /**
   * Find vouchers by payment mode
   */
  async findByPaymentMode(paymentMode) {
    return this.db('vouchers')
      .where({ payment_mode: paymentMode })
      .whereNull('deleted_at')
      .orderBy('voucher_date', 'desc');
  }

  /**
   * Find approved vouchers
   */
  async findApproved() {
    return this.db('vouchers')
      .where({ status: 'approved' })
      .whereNull('deleted_at')
      .orderBy('approved_at', 'desc');
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
    return this.db('vouchers')
      .where({ id })
      .whereNull('deleted_at')
      .update(updateData)
      .returning('*');
  }
}

module.exports = new VoucherModel();
