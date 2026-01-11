/**
 * Transmittal Controller
 */

const BaseController = require('../base/base.controller');
const TransmittalService = require('./transmittal.service');

class TransmittalController extends BaseController {
  constructor() {
    super(new TransmittalService());
  }
}

module.exports = new TransmittalController();
