/**
 * Document Model
 * Table: documents
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class DocumentModel extends BaseModel {
  constructor() {
    super('documents', db);
  }

  /**
   * Find documents by entity
   */
  async findByEntity(entityType, entityId) {
    return this.db('documents')
      .where({ entity_type: entityType, entity_id: entityId })
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc');
  }

  /**
   * Find documents by document type
   */
  async findByDocumentType(documentType) {
    return this.db('documents')
      .where({ document_type: documentType })
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc');
  }

  /**
   * Find documents by uploader
   */
  async findByUploader(uploadedBy) {
    return this.db('documents')
      .where({ uploaded_by: uploadedBy })
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc');
  }

  /**
   * Find document by path
   */
  async findByPath(documentPath) {
    return this.db('documents')
      .where({ document_path: documentPath })
      .whereNull('deleted_at')
      .first();
  }
}

module.exports = new DocumentModel();
