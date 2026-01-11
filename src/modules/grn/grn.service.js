/**
 * GRN Service
 */

const BaseService = require('../base/base.service');
const GrnRepository = require('./grn.repository');

class GrnService extends BaseService {
  constructor() {
    super(new GrnRepository());
  }
}

module.exports = GrnService;
