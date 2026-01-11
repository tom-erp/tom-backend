/**
 * GRN Controller
 */

const BaseController = require('../base/base.controller');
const GrnService = require('./grn.service');

class GrnController extends BaseController {
  constructor() {
    super(new GrnService());
  }
}

module.exports = new GrnController();
