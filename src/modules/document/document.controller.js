/**
 * Document Controller
 */

const BaseController = require('../base/base.controller');
const DocumentService = require('./document.service');

class DocumentController extends BaseController {
  constructor() {
    super(new DocumentService());
  }
}

module.exports = new DocumentController();
