/**
 * Purchase Order Controller
 */

const BaseController = require('../base/base.controller');
const PoService = require('./po.service');

class PoController extends BaseController {
  constructor() {
    super(new PoService());
  }
}

module.exports = new PoController();
