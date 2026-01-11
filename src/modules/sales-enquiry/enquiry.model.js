/**
 * Sales Enquiry Model
 * Table: sales_enquiries
 * Serves as the Lead entity in the system (CRM leads)
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class SalesEnquiryModel extends BaseModel {
  constructor() {
    super('sales_enquiries', db);
  }

  /**
   * Find enquiries by status
   */
  async findByStatus(status) {
    return this.db('sales_enquiries')
      .where({ status })
      .whereNull('deleted_at');
  }

  /**
   * Find enquiries by client
   */
  async findByClient(clientId) {
    return this.db('sales_enquiries')
      .where({ client_id: clientId })
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc');
  }

  /**
   * Find enquiries by assigned user
   */
  async findByAssignedTo(userId) {
    return this.db('sales_enquiries')
      .where({ assigned_to: userId })
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc');
  }

  /**
   * Find enquiries by enquiry number
   */
  async findByEnquiryNumber(enquiryNumber) {
    return this.db('sales_enquiries')
      .where({ enquiry_number: enquiryNumber })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Find active enquiries (not closed or cancelled)
   */
  async findActive() {
    return this.db('sales_enquiries')
      .whereNotIn('status', ['closed', 'cancelled'])
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc');
  }

  /**
   * Find enquiries with quotations
   */
  async findWithQuotations() {
    return this.db('sales_enquiries')
      .innerJoin('sales_quotations', 'sales_enquiries.id', 'sales_quotations.enquiry_id')
      .whereNull('sales_enquiries.deleted_at')
      .select('sales_enquiries.*')
      .groupBy('sales_enquiries.id');
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
    return this.db('sales_enquiries')
      .where({ id })
      .whereNull('deleted_at')
      .update(updateData)
      .returning('*');
  }
}

module.exports = new SalesEnquiryModel();
