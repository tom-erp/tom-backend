/**
 * Customer Payment Allocation Model
 * Table: customer_payment_allocations
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class CustomerPaymentAllocationModel extends BaseModel {
  constructor() {
    super('customer_payment_allocations', db);
  }

  /**
   * Find allocations by payment
   */
  async findByPayment(paymentId) {
    return this.db('customer_payment_allocations')
      .where({ payment_id: paymentId });
  }

  /**
   * Find allocations by invoice
   */
  async findByInvoice(invoiceId) {
    return this.db('customer_payment_allocations')
      .where({ invoice_id: invoiceId });
  }

  /**
   * Create multiple allocations for a payment
   */
  async createBulk(paymentId, allocations) {
    const allocationsToInsert = allocations.map(allocation => ({
      payment_id: paymentId,
      invoice_id: allocation.invoice_id,
      allocated_amount: allocation.allocated_amount,
      notes: allocation.notes || null
    }));

    return this.db('customer_payment_allocations')
      .insert(allocationsToInsert)
      .returning('*');
  }

  /**
   * Delete all allocations for a payment
   */
  async deleteByPayment(paymentId) {
    return this.db('customer_payment_allocations')
      .where({ payment_id: paymentId })
      .del();
  }
}

module.exports = new CustomerPaymentAllocationModel();
