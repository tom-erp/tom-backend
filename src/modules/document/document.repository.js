/**
 * Document Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class DocumentRepository extends BaseModel {
  constructor() {
    super('documents', db);
  }
}

module.exports = DocumentRepository;
