/**
 * Purchase Order Model
 * Table: purchase_orders
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class PurchaseOrderModel extends BaseModel {
  constructor() {
    super('purchase_orders', db);
  }

  /**
   * Find POs by PR
   */
  async findByPR(prId) {
    return this.db('purchase_orders')
      .where({ pr_id: prId })
      .whereNull('deleted_at')
      .orderBy('order_date', 'desc');
  }

  /**
   * Find POs by project
   */
  async findByProject(projectId) {
    return this.db('purchase_orders')
      .where({ project_id: projectId })
      .whereNull('deleted_at')
      .orderBy('order_date', 'desc');
  }

  /**
   * Find POs by vendor
   */
  async findByVendor(vendorId) {
    return this.db('purchase_orders')
      .where({ vendor_id: vendorId })
      .whereNull('deleted_at')
      .orderBy('order_date', 'desc');
  }

  /**
   * Find PO by PO number
   */
  async findByPONumber(poNumber) {
    return this.db('purchase_orders')
      .where({ po_number: poNumber })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Find POs by status
   */
  async findByStatus(status) {
    return this.db('purchase_orders')
      .where({ status })
      .whereNull('deleted_at')
      .orderBy('order_date', 'desc');
  }

  /**
   * Find pending receipt POs
   */
  async findPendingReceipt() {
    return this.db('purchase_orders')
      .whereIn('status', ['approved', 'sent', 'partially_received'])
      .whereNull('deleted_at')
      .orderBy('delivery_date', 'asc');
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
    return this.db('purchase_orders')
      .where({ id })
      .whereNull('deleted_at')
      .update(updateData)
      .returning('*');
  }

  /**
   * Find PO with items
   */
  async findWithItems(id) {
    const po = await this.findById(id);
    if (!po) return null;

    const items = await this.db('purchase_order_items')
      .where({ po_id: id })
      .orderBy('sequence', 'asc');

    return {
      ...po,
      items
    };
  }

  /**
   * Calculate total amount from items
   */
  async calculateTotal(id) {
    const result = await this.db('purchase_order_items')
      .where({ po_id: id })
      .sum('line_total as total')
      .first();
    return result ? parseFloat(result.total || 0) : 0;
  }
}

module.exports = new PurchaseOrderModel();
