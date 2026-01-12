/**
 * Client Purchase Order Controller
 */

const BaseController = require('../base/base.controller');
const ClientPoService = require('./client-po.service');
const asyncHandler = require('../../utils/helpers/async-handler');

class ClientPoController extends BaseController {
  constructor() {
    super(new ClientPoService());
  }

  // Get POs by client
  getByClient = asyncHandler(async (req, res) => {
    const { clientId } = req.params;
    const pos = await this.service.findByClient(clientId);
    res.json({ success: true, data: pos });
  });

  // Get POs by project
  getByProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const pos = await this.service.findByProject(projectId);
    res.json({ success: true, data: pos });
  });

  // Get PO by PO number
  getByPONumber = asyncHandler(async (req, res) => {
    const { poNumber } = req.params;
    const po = await this.service.findByPONumber(poNumber);
    res.json({ success: true, data: po });
  });

  // Get POs by status
  getByStatus = asyncHandler(async (req, res) => {
    const { status } = req.params;
    const pos = await this.service.findByStatus(status);
    res.json({ success: true, data: pos });
  });

  // Acknowledge PO
  acknowledge = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { acknowledgedBy } = req.body;
    const po = await this.service.acknowledge(id, acknowledgedBy);
    res.json({ success: true, data: po });
  });

  // Update status
  updateStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status, updatedBy } = req.body;
    const po = await this.service.updateStatus(id, status, updatedBy);
    res.json({ success: true, data: po });
  });

  // Get PO with items
  getWithItems = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const po = await this.service.findWithItems(id);
    res.json({ success: true, data: po });
  });
}

module.exports = new ClientPoController();
