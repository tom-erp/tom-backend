/**
 * Delivery Order Document Model
 * Table: delivery_order_documents
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class DeliveryOrderDocumentModel extends BaseModel {
  constructor() {
    super('delivery_order_documents', db);
  }

  /**
   * Find documents by DO
   */
  async findByDO(doId) {
    return this.db('delivery_order_documents')
      .where({ do_id: doId })
      .orderBy('created_at', 'desc');
  }

  /**
   * Find documents by document type
   */
  async findByDocumentType(doId, documentType) {
    return this.db('delivery_order_documents')
      .where({ do_id: doId, document_type: documentType })
      .orderBy('created_at', 'desc');
  }
}

module.exports = new DeliveryOrderDocumentModel();
