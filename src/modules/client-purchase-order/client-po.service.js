/**
 * Client Purchase Order Service
 */

const BaseService = require('../base/base.service');
const ClientPoRepository = require('./client-po.repository');
const ClientPoModel = require('./client-po.model');
const ClientPoItemModel = require('./client-po-item.model');

class ClientPoService extends BaseService {
  constructor() {
    super(new ClientPoRepository());
  }

  async findByClient(clientId) {
    return ClientPoModel.findByClient(clientId);
  }

  async findByProject(projectId) {
    return ClientPoModel.findByProject(projectId);
  }

  async findByPONumber(poNumber) {
    return ClientPoModel.findByPONumber(poNumber);
  }

  async findByStatus(status) {
    return ClientPoModel.findByStatus(status);
  }

  async acknowledge(id, acknowledgedBy) {
    return ClientPoModel.acknowledge(id, acknowledgedBy);
  }

  async updateStatus(id, status, updatedBy) {
    return ClientPoModel.updateStatus(id, status, updatedBy);
  }

  async findWithItems(id) {
    return ClientPoModel.findWithItems(id);
  }

  async create(data) {
    const { items, ...poData } = data;
    
    // Check for duplicate PO number
    if (await ClientPoModel.isDuplicatePONumber(poData.client_po_number)) {
      throw new Error('PO number already exists');
    }

    // Create PO
    const po = await this.repository.create(poData);
    
    // Create items if provided
    if (items && items.length > 0) {
      await ClientPoItemModel.createBulk(po.id, items);
    }
    
    return this.findWithItems(po.id);
  }

  async update(id, data) {
    const { items, ...poData } = data;
    
    // Check for duplicate PO number (excluding current record)
    if (poData.client_po_number && await ClientPoModel.isDuplicatePONumber(poData.client_po_number, id)) {
      throw new Error('PO number already exists');
    }

    // Update PO
    const po = await this.repository.update(id, poData);
    
    // Update items if provided
    if (items) {
      await ClientPoItemModel.deleteByClientPO(id);
      if (items.length > 0) {
        await ClientPoItemModel.createBulk(id, items);
      }
    }
    
    return this.findWithItems(id);
  }
}

module.exports = ClientPoService;
