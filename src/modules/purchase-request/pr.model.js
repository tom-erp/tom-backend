/**
 * Purchase Request Model
 * Table: purchase_requests
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class PurchaseRequestModel extends BaseModel {
  constructor() {
    super('purchase_requests', db);
  }

  /**
   * Find PRs by project
   */
  async findByProject(projectId) {
    return this.db('purchase_requests')
      .where({ project_id: projectId })
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc');
  }

  /**
   * Find PRs by status
   */
  async findByStatus(status) {
    return this.db('purchase_requests')
      .where({ status })
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc');
  }

  /**
   * Find PRs by requestor
   */
  async findByRequestor(requestorId) {
    return this.db('purchase_requests')
      .where({ requestor_id: requestorId })
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc');
  }

  /**
   * Find PR by PR number
   */
  async findByPRNumber(prNumber) {
    return this.db('purchase_requests')
      .where({ pr_number: prNumber })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Find pending approval PRs
   */
  async findPendingApproval() {
    return this.db('purchase_requests')
      .whereIn('status', ['submitted', 'under_review'])
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc');
  }

  /**
   * Find approved PRs
   */
  async findApproved() {
    return this.db('purchase_requests')
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
    return this.db('purchase_requests')
      .where({ id })
      .whereNull('deleted_at')
      .update(updateData)
      .returning('*');
  }

  /**
   * Reject PR
   */
  async reject(id, rejectedBy, rejectionReason) {
    return this.db('purchase_requests')
      .where({ id })
      .whereNull('deleted_at')
      .update({
        status: 'rejected',
        rejected_by: rejectedBy,
        rejected_at: this.db.fn.now(),
        rejection_reason: rejectionReason,
        updated_at: this.db.fn.now()
      })
      .returning('*');
  }

  /**
   * Find PR with items
   */
  async findWithItems(id) {
    const pr = await this.findById(id);
    if (!pr) return null;

    const items = await this.db('purchase_request_items')
      .where({ pr_id: id })
      .orderBy('sequence', 'asc');

    return {
      ...pr,
      items
    };
  }
}

module.exports = new PurchaseRequestModel();
