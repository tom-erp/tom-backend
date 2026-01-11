/**
 * Transmittal Service
 */

const BaseService = require('../base/base.service');
const TransmittalRepository = require('./transmittal.repository');

class TransmittalService extends BaseService {
  constructor() {
    super(new TransmittalRepository());
  }
}

module.exports = TransmittalService;
