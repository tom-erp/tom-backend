/**
 * Document Service
 */

const BaseService = require('../base/base.service');
const DocumentRepository = require('./document.repository');

class DocumentService extends BaseService {
  constructor() {
    super(new DocumentRepository());
  }
}

module.exports = DocumentService;
