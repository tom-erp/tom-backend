/**
 * WIP Controller
 */

const BaseController = require('../base/base.controller');
const WipService = require('./wip.service');

class WipController extends BaseController {
  constructor() {
    super(new WipService());
  }
}

module.exports = new WipController();
