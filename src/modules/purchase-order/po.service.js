/**
 * Purchase Order Service
 */

const BaseService = require('../base/base.service');
const PoRepository = require('./po.repository');

class PoService extends BaseService {
  constructor() {
    super(new PoRepository());
  }
}

module.exports = PoService;
