/**
 * Purchase Request Service
 */

const BaseService = require('../base/base.service');
const PrRepository = require('./pr.repository');

class PrService extends BaseService {
  constructor() {
    super(new PrRepository());
  }
}

module.exports = PrService;
