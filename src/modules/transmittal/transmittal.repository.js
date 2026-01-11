/**
 * Transmittal Repository
 */

const db = require('../../config/database');
const BaseModel = require('../base/base.model');

class TransmittalRepository extends BaseModel {
  constructor() {
    super('transmittal_forms', db);
  }
}

module.exports = TransmittalRepository;
