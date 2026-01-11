/**
 * Communication Log Service
 */

const BaseService = require('../base/base.service');
const Communication_LogRepository = require('./communication-log.repository');

class Communication_LogService extends BaseService {
  constructor() {
    super(new Communication_LogRepository());
  }
}

module.exports = Communication_LogService;
