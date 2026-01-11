/**
 * Communication Log Controller
 */

const BaseController = require('../base/base.controller');
const Communication_LogService = require('./communication-log.service');

class Communication_LogController extends BaseController {
  constructor() {
    super(new Communication_LogService());
  }
}

module.exports = new Communication_LogController();
