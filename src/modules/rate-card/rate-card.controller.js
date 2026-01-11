/**
 * Rate Card Controller
 */

const BaseController = require('../base/base.controller');
const Rate_CardService = require('./rate-card.service');

class Rate_CardController extends BaseController {
  constructor() {
    super(new Rate_CardService());
  }
}

module.exports = new Rate_CardController();
