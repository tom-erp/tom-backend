/**
 * Purchase Request Controller
 */

const BaseController = require('../base/base.controller');
const PrService = require('./pr.service');

class PrController extends BaseController {
  constructor() {
    super(new PrService());
  }
}

module.exports = new PrController();
