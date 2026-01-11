/**
 * Vendor Payment Model
 * Table: vendor_payments
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class VendorPaymentModel extends BaseModel {
  constructor() {
    super('vendor_payments', db);
  }

  /**
   * Find payments by vendor
   */
  async findByVendor(vendorId) {
    return this.db('vendor_payments')
      .where({ vendor_id: vendorId })
      .whereNull('deleted_at')
      .orderBy('payment_date', 'desc');
  }

  /**
   * Find payment by payment number
   */
  async findByPaymentNumber(paymentNumber) {
    return this.db('vendor_payments')
      .where({ payment_number: paymentNumber })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Find payments by status
   */
  async findByStatus(status) {
    return this.db('vendor_payments')
      .where({ status })
      .whereNull('deleted_at')
      .orderBy('payment_date', 'desc');
  }

  /**
   * Find payments by payment mode
   */
  async findByPaymentMode(paymentMode) {
    return this.db('vendor_payments')
      .where({ payment_mode: paymentMode })
      .whereNull('deleted_at')
      .orderBy('payment_date', 'desc');
  }

  /**
   * Find scheduled payments
   */
  async findScheduled() {
    return this.db('vendor_payments')
      .where({ status: 'scheduled' })
      .whereNull('deleted_at')
      .orderBy('scheduled_date', 'asc');
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
    if (status === 'paid') {
      updateData.paid_at = this.db.fn.now();
    }
    return this.db('vendor_payments')
      .where({ id })
      .whereNull('deleted_at')
      .update(updateData)
      .returning('*');
  }

  /**
   * Find payment with allocations
   */
  async findWithAllocations(id) {
    const payment = await this.findById(id);
    if (!payment) return null;

    const allocations = await this.db('vendor_payment_allocations')
      .where({ payment_id: id });

    return {
      ...payment,
      allocations
    };
  }

  /**
   * Calculate total allocated amount
   */
  async calculateTotalAllocated(id) {
    const result = await this.db('vendor_payment_allocations')
      .where({ payment_id: id })
      .sum('allocated_amount as total')
      .first();
    return result ? parseFloat(result.total || 0) : 0;
  }
}

module.exports = new VendorPaymentModel();
