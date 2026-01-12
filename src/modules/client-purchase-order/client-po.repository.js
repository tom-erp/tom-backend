/**
 * Client Purchase Order Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class ClientPoRepository extends BaseModel {
  constructor() {
    super('client_purchase_orders', db);
  }

  async findByClient(clientId) {
    return this.findAll({ client_id: clientId });
  }

  async findByProject(projectId) {
    return this.findAll({ project_id: projectId });
  }

  async findByPONumber(poNumber) {
    return this.db(this.tableName)
      .leftJoin('organizations as client', 'client_purchase_orders.client_id', 'client.id')
      .select(
        'client_purchase_orders.*',
        'client.name as client_name'
      )
      .where('client_purchase_orders.client_po_number', poNumber)
      .whereNull('client_purchase_orders.deleted_at')
      .first();
  }

  async findByStatus(status) {
    return this.findAll({ status });
  }

  async findWithItems(id) {
    const po = await this.findById(id);
    if (!po) return null;

    const items = await this.db('client_purchase_order_items')
      .where('client_po_id', id)
      .orderBy('sequence');

    return { ...po, items };
  }

  async acknowledge(id, acknowledgedBy) {
    return this.update(id, {
      acknowledgement_sent: true,
      acknowledgement_date: new Date(),
      status: 'acknowledged',
      updated_at: new Date()
    });
  }

  async updateStatus(id, status, updatedBy) {
    return this.update(id, {
      status,
      updated_at: new Date()
    });
  }

  async findAll(filters = {}) {
    let query = this.db(this.tableName)
      .leftJoin('organizations as client', 'client_purchase_orders.client_id', 'client.id')
      .leftJoin('sales_quotations as quotation', 'client_purchase_orders.quotation_id', 'quotation.id')
      .select(
        'client_purchase_orders.*',
        'client.name as client_name',
        'quotation.quotation_number'
      )
      .whereNull('client_purchase_orders.deleted_at');

    if (filters.status) {
      query = query.where('client_purchase_orders.status', filters.status);
    }
    if (filters.client_id) {
      query = query.where('client_purchase_orders.client_id', filters.client_id);
    }
    if (filters.project_id) {
      query = query.where('client_purchase_orders.project_id', filters.project_id);
    }
    if (filters.po_date_from) {
      query = query.where('client_purchase_orders.po_date', '>=', filters.po_date_from);
    }
    if (filters.po_date_to) {
      query = query.where('client_purchase_orders.po_date', '<=', filters.po_date_to);
    }

    return query.orderBy('client_purchase_orders.po_date', 'desc');
  }

  async findById(id) {
    return this.db(this.tableName)
      .leftJoin('organizations as client', 'client_purchase_orders.client_id', 'client.id')
      .leftJoin('sales_quotations as quotation', 'client_purchase_orders.quotation_id', 'quotation.id')
      .leftJoin('users as created_user', 'client_purchase_orders.created_by', 'created_user.id')
      .select(
        'client_purchase_orders.*',
        'client.name as client_name',
        'quotation.quotation_number',
        this.db.raw("CONCAT(created_user.first_name, ' ', created_user.last_name) as created_by_name")
      )
      .where('client_purchase_orders.id', id)
      .whereNull('client_purchase_orders.deleted_at')
      .first();
  }
}

module.exports = ClientPoRepository;
