/**
 * Delivery Order Model
 * Table: delivery_orders
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class DeliveryOrderModel extends BaseModel {
  constructor() {
    super('delivery_orders', db);
  }

  /**
   * Find DOs by project
   */
  async findByProject(projectId) {
    return this.db('delivery_orders')
      .where({ project_id: projectId })
      .whereNull('deleted_at')
      .orderBy('delivery_date', 'desc');
  }

  /**
   * Find DOs by client
   */
  async findByClient(clientId) {
    return this.db('delivery_orders')
      .where({ client_id: clientId })
      .whereNull('deleted_at')
      .orderBy('delivery_date', 'desc');
  }

  /**
   * Find DOs by PO
   */
  async findByPO(poId) {
    return this.db('delivery_orders')
      .where({ po_id: poId })
      .whereNull('deleted_at')
      .orderBy('delivery_date', 'desc');
  }

  /**
   * Find DO by DO number
   */
  async findByDONumber(doNumber) {
    return this.db('delivery_orders')
      .where({ do_number: doNumber })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Find DOs by status
   */
  async findByStatus(status) {
    return this.db('delivery_orders')
      .where({ status })
      .whereNull('deleted_at')
      .orderBy('delivery_date', 'desc');
  }

  /**
   * Find pending acknowledgment DOs
   */
  async findPendingAcknowledgment() {
    return this.db('delivery_orders')
      .where({ status: 'delivered' })
      .whereNull('acknowledged_at')
      .whereNull('deleted_at')
      .orderBy('delivery_date', 'desc');
  }

  /**
   * Acknowledge DO
   */
  async acknowledge(id, acknowledgedBy, signature = null) {
    return this.db('delivery_orders')
      .where({ id })
      .whereNull('deleted_at')
      .update({
        status: 'acknowledged',
        acknowledged_by: acknowledgedBy,
        acknowledged_at: this.db.fn.now(),
        acknowledgment_signature: signature,
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
    if (status === 'approved') {
      updateData.approved_at = this.db.fn.now();
      updateData.approved_by = updatedBy;
    }
    return this.db('delivery_orders')
      .where({ id })
      .whereNull('deleted_at')
      .update(updateData)
      .returning('*');
  }

  /**
   * Find DO with items and documents
   */
  async findWithDetails(id) {
    const do_record = await this.findById(id);
    if (!do_record) return null;

    const items = await this.db('delivery_order_items')
      .where({ do_id: id })
      .orderBy('sequence', 'asc');

    const documents = await this.db('delivery_order_documents')
      .where({ do_id: id });

    return {
      ...do_record,
      items,
      documents
    };
  }
}

module.exports = new DeliveryOrderModel();
