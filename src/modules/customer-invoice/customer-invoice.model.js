/**
 * Customer Invoice Model
 * Table: customer_invoices
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class CustomerInvoiceModel extends BaseModel {
  constructor() {
    super('customer_invoices', db);
  }

  /**
   * Find invoices by sales order
   */
  async findBySalesOrder(salesOrderId) {
    return this.db('customer_invoices')
      .where({ sales_order_id: salesOrderId })
      .whereNull('deleted_at')
      .orderBy('invoice_date', 'desc');
  }

  /**
   * Find invoices by project
   */
  async findByProject(projectId) {
    return this.db('customer_invoices')
      .where({ project_id: projectId })
      .whereNull('deleted_at')
      .orderBy('invoice_date', 'desc');
  }

  /**
   * Find invoices by client
   */
  async findByClient(clientId) {
    return this.db('customer_invoices')
      .where({ client_id: clientId })
      .whereNull('deleted_at')
      .orderBy('invoice_date', 'desc');
  }

  /**
   * Find invoices by DO
   */
  async findByDO(doId) {
    return this.db('customer_invoices')
      .where({ do_id: doId })
      .whereNull('deleted_at')
      .orderBy('invoice_date', 'desc');
  }

  /**
   * Find invoice by invoice number
   */
  async findByInvoiceNumber(invoiceNumber) {
    return this.db('customer_invoices')
      .where({ invoice_number: invoiceNumber })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Find invoices by status
   */
  async findByStatus(status) {
    return this.db('customer_invoices')
      .where({ status })
      .whereNull('deleted_at')
      .orderBy('invoice_date', 'desc');
  }

  /**
   * Find overdue invoices
   */
  async findOverdue() {
    return this.db('customer_invoices')
      .where('due_date', '<', this.db.fn.now())
      .whereIn('status', ['sent', 'partially_paid'])
      .whereNull('deleted_at')
      .orderBy('due_date', 'asc');
  }

  /**
   * Find pending payment invoices
   */
  async findPendingPayment() {
    return this.db('customer_invoices')
      .whereIn('status', ['sent', 'partially_paid'])
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
    if (status === 'sent') {
      updateData.sent_at = this.db.fn.now();
    }
    return this.db('customer_invoices')
      .where({ id })
      .whereNull('deleted_at')
      .update(updateData)
      .returning('*');
  }

  /**
   * Update paid amount
   */
  async updatePaidAmount(id, amount) {
    return this.db('customer_invoices')
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
   * Find invoice with items
   */
  async findWithItems(id) {
    const invoice = await this.findById(id);
    if (!invoice) return null;

    const items = await this.db('customer_invoice_items')
      .where({ invoice_id: id })
      .orderBy('sequence', 'asc');

    return {
      ...invoice,
      items
    };
  }
}

module.exports = new CustomerInvoiceModel();
