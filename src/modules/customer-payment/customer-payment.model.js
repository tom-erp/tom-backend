/**
 * Customer Payment Model
 * Table: customer_payments
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class CustomerPaymentModel extends BaseModel {
  constructor() {
    super('customer_payments', db);
  }

  /**
   * Find payments by client
   */
  async findByClient(clientId) {
    return this.db('customer_payments')
      .where({ client_id: clientId })
      .whereNull('deleted_at')
      .orderBy('payment_date', 'desc');
  }

  /**
   * Find payment by payment number
   */
  async findByPaymentNumber(paymentNumber) {
    return this.db('customer_payments')
      .where({ payment_number: paymentNumber })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Find payments by status
   */
  async findByStatus(status) {
    return this.db('customer_payments')
      .where({ status })
      .whereNull('deleted_at')
      .orderBy('payment_date', 'desc');
  }

  /**
   * Find payments by payment mode
   */
  async findByPaymentMode(paymentMode) {
    return this.db('customer_payments')
      .where({ payment_mode: paymentMode })
      .whereNull('deleted_at')
      .orderBy('payment_date', 'desc');
  }

  /**
   * Find payments by invoice
   */
  async findByInvoice(invoiceId) {
    return this.db('customer_payments')
      .innerJoin('customer_payment_allocations', 'customer_payments.id', 'customer_payment_allocations.payment_id')
      .where('customer_payment_allocations.invoice_id', invoiceId)
      .whereNull('customer_payments.deleted_at')
      .select('customer_payments.*')
      .groupBy('customer_payments.id')
      .orderBy('customer_payments.payment_date', 'desc');
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
    if (status === 'confirmed') {
      updateData.confirmed_at = this.db.fn.now();
    }
    return this.db('customer_payments')
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

    const allocations = await this.db('customer_payment_allocations')
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
    const result = await this.db('customer_payment_allocations')
      .where({ payment_id: id })
      .sum('allocated_amount as total')
      .first();
    return result ? parseFloat(result.total || 0) : 0;
  }
}

module.exports = new CustomerPaymentModel();
