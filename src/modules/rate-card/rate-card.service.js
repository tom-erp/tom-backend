/**
 * Rate Card Service
 */

const BaseService = require('../base/base.service');
const Rate_CardRepository = require('./rate-card.repository');

class Rate_CardService extends BaseService {
  constructor() {
    super(new Rate_CardRepository());
  }
}

module.exports = Rate_CardService;
