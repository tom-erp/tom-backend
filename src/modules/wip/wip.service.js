/**
 * WIP Service
 */

const BaseService = require('../base/base.service');
const WipRepository = require('./wip.repository');

class WipService extends BaseService {
  constructor() {
    super(new WipRepository());
  }
}

module.exports = WipService;
