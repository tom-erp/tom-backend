/**
 * Client Purchase Order Controller
 */

const BaseController = require('../base/base.controller');
const Client_PoService = require('./client-po.service');

class Client_PoController extends BaseController {
  constructor() {
    super(new Client_PoService());
  }
}

module.exports = new Client_PoController();
