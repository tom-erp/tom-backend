/**
 * Client Purchase Order Service
 */

const BaseService = require('../base/base.service');
const Client_PoRepository = require('./client-po.repository');

class Client_PoService extends BaseService {
  constructor() {
    super(new Client_PoRepository());
  }
}

module.exports = Client_PoService;
