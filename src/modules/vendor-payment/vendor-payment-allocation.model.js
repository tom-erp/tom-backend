/**
 * Vendor Payment Allocation Model
 * Table: vendor_payment_allocations
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class VendorPaymentAllocationModel extends BaseModel {
  constructor() {
    super('vendor_payment_allocations', db);
  }

  /**
   * Find allocations by payment
   */
  async findByPayment(paymentId) {
    return this.db('vendor_payment_allocations')
      .where({ payment_id: paymentId });
  }

  /**
   * Find allocations by bill
   */
  async findByBill(billId) {
    return this.db('vendor_payment_allocations')
      .where({ bill_id: billId });
  }

  /**
   * Create multiple allocations for a payment
   */
  async createBulk(paymentId, allocations) {
    const allocationsToInsert = allocations.map(allocation => ({
      payment_id: paymentId,
      bill_id: allocation.bill_id,
      allocated_amount: allocation.allocated_amount,
      notes: allocation.notes || null
    }));

    return this.db('vendor_payment_allocations')
      .insert(allocationsToInsert)
      .returning('*');
  }

  /**
   * Delete all allocations for a payment
   */
  async deleteByPayment(paymentId) {
    return this.db('vendor_payment_allocations')
      .where({ payment_id: paymentId })
      .del();
  }
}

module.exports = new VendorPaymentAllocationModel();
