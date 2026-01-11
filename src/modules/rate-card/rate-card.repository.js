/**
 * Rate Card Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class Rate_CardRepository extends BaseModel {
  constructor() {
    super('rate_cards', db);
  }
}

module.exports = Rate_CardRepository;
