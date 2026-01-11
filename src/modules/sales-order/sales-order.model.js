/**
 * Sales Order Model
 * Table: sales_orders
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class SalesOrderModel extends BaseModel {
  constructor() {
    super('sales_orders', db);
  }

  /**
   * Find sales orders by quotation
   */
  async findByQuotation(quotationId) {
    return this.db('sales_orders')
      .where({ quotation_id: quotationId })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Find sales orders by client
   */
  async findByClient(clientId) {
    return this.db('sales_orders')
      .where({ client_id: clientId })
      .whereNull('deleted_at')
      .orderBy('order_date', 'desc');
  }

  /**
   * Find sales orders by project
   */
  async findByProject(projectId) {
    return this.db('sales_orders')
      .where({ project_id: projectId })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Find sales order by order number
   */
  async findByOrderNumber(orderNumber) {
    return this.db('sales_orders')
      .where({ sales_order_number: orderNumber })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Find sales orders by status
   */
  async findByStatus(status) {
    return this.db('sales_orders')
      .where({ status })
      .whereNull('deleted_at')
      .orderBy('order_date', 'desc');
  }

  /**
   * Find active sales orders
   */
  async findActive() {
    return this.db('sales_orders')
      .where({ status: 'active' })
      .whereNull('deleted_at')
      .orderBy('order_date', 'desc');
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
    return this.db('sales_orders')
      .where({ id })
      .whereNull('deleted_at')
      .update(updateData)
      .returning('*');
  }

  /**
   * Find sales order with items
   */
  async findWithItems(id) {
    const order = await this.findById(id);
    if (!order) return null;

    const items = await this.db('sales_order_items')
      .where({ sales_order_id: id })
      .orderBy('sequence', 'asc');

    return {
      ...order,
      items
    };
  }

  /**
   * Calculate total amount from items
   */
  async calculateTotal(id) {
    const result = await this.db('sales_order_items')
      .where({ sales_order_id: id })
      .sum('line_total as total')
      .first();
    return result ? parseFloat(result.total || 0) : 0;
  }
}

module.exports = new SalesOrderModel();
