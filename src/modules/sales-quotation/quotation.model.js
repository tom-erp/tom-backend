/**
 * Sales Quotation Model
 * Table: sales_quotations
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class SalesQuotationModel extends BaseModel {
  constructor() {
    super('sales_quotations', db);
  }

  /**
   * Find quotations by enquiry
   */
  async findByEnquiry(enquiryId) {
    return this.db('sales_quotations')
      .where({ enquiry_id: enquiryId })
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc');
  }

  /**
   * Find quotations by status
   */
  async findByStatus(status) {
    return this.db('sales_quotations')
      .where({ status })
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc');
  }

  /**
   * Find quotations by client
   */
  async findByClient(clientId) {
    return this.db('sales_quotations')
      .where({ client_id: clientId })
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc');
  }

  /**
   * Find quotation by quotation number
   */
  async findByQuotationNumber(quotationNumber) {
    return this.db('sales_quotations')
      .where({ quotation_number: quotationNumber })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Find approved quotations
   */
  async findApproved() {
    return this.db('sales_quotations')
      .where({ status: 'approved' })
      .whereNull('deleted_at')
      .orderBy('approved_at', 'desc');
  }

  /**
   * Find quotations pending approval
   */
  async findPendingApproval() {
    return this.db('sales_quotations')
      .where({ status: 'pending_approval' })
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc');
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
    }
    return this.db('sales_quotations')
      .where({ id })
      .whereNull('deleted_at')
      .update(updateData)
      .returning('*');
  }

  /**
   * Find quotation with items
   */
  async findWithItems(id) {
    const quotation = await this.findById(id);
    if (!quotation) return null;

    const items = await this.db('sales_quotation_items')
      .where({ quotation_id: id })
      .orderBy('sequence', 'asc');

    return {
      ...quotation,
      items
    };
  }

  /**
   * Calculate total amount from items
   */
  async calculateTotal(id) {
    const result = await this.db('sales_quotation_items')
      .where({ quotation_id: id })
      .sum('line_total as total')
      .first();
    return result ? parseFloat(result.total || 0) : 0;
  }
}

module.exports = new SalesQuotationModel();
