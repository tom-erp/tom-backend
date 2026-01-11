/**
 * Client Purchase Order Model
 * Table: client_purchase_orders
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class ClientPurchaseOrderModel extends BaseModel {
  constructor() {
    super('client_purchase_orders', db);
  }

  /**
   * Find client POs by client
   */
  async findByClient(clientId) {
    return this.db('client_purchase_orders')
      .where({ client_id: clientId })
      .whereNull('deleted_at')
      .orderBy('po_date', 'desc');
  }

  /**
   * Find client POs by project
   */
  async findByProject(projectId) {
    return this.db('client_purchase_orders')
      .where({ project_id: projectId })
      .whereNull('deleted_at')
      .orderBy('po_date', 'desc');
  }

  /**
   * Find client PO by PO number
   */
  async findByPONumber(poNumber) {
    return this.db('client_purchase_orders')
      .where({ client_po_number: poNumber })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Find client POs by status
   */
  async findByStatus(status) {
    return this.db('client_purchase_orders')
      .where({ status })
      .whereNull('deleted_at')
      .orderBy('po_date', 'desc');
  }

  /**
   * Find acknowledged client POs
   */
  async findAcknowledged() {
    return this.db('client_purchase_orders')
      .where({ acknowledged: true })
      .whereNull('deleted_at')
      .orderBy('acknowledged_at', 'desc');
  }

  /**
   * Find pending acknowledgment
   */
  async findPendingAcknowledgment() {
    return this.db('client_purchase_orders')
      .where({ acknowledged: false })
      .whereNull('deleted_at')
      .orderBy('po_date', 'desc');
  }

  /**
   * Acknowledge client PO
   */
  async acknowledge(id, acknowledgedBy) {
    return this.db('client_purchase_orders')
      .where({ id })
      .whereNull('deleted_at')
      .update({
        acknowledged: true,
        acknowledged_at: this.db.fn.now(),
        acknowledged_by: acknowledgedBy,
        updated_at: this.db.fn.now()
      })
      .returning('*');
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
    return this.db('client_purchase_orders')
      .where({ id })
      .whereNull('deleted_at')
      .update(updateData)
      .returning('*');
  }

  /**
   * Find client PO with items
   */
  async findWithItems(id) {
    const po = await this.findById(id);
    if (!po) return null;

    const items = await this.db('client_purchase_order_items')
      .where({ client_po_id: id })
      .orderBy('sequence', 'asc');

    return {
      ...po,
      items
    };
  }

  /**
   * Check for duplicate PO number
   */
  async isDuplicatePONumber(poNumber, excludeId = null) {
    const query = this.db('client_purchase_orders')
      .where({ client_po_number: poNumber })
      .whereNull('deleted_at');
    
    if (excludeId) {
      query.whereNot({ id: excludeId });
    }
    
    const result = await query.first();
    return !!result;
  }
}

module.exports = new ClientPurchaseOrderModel();
