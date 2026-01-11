/**
 * Base Controller
 * Provides common controller functionality for all modules
 */

const asyncHandler = require('../../utils/helpers/async-handler');

class BaseController {
  constructor(service) {
    this.service = service;
  }

  getAll = asyncHandler(async (req, res) => {
    const filters = req.query;
    const records = await this.service.findAll(filters);
    res.json({
      success: true,
      data: records
    });
  });

  getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const record = await this.service.findById(id);
    res.json({
      success: true,
      data: record
    });
  });

  create = asyncHandler(async (req, res) => {
    const data = req.body;
    const record = await this.service.create(data);
    res.status(201).json({
      success: true,
      data: record
    });
  });

  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const record = await this.service.update(id, data);
    res.json({
      success: true,
      data: record
    });
  });

  delete = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await this.service.delete(id);
    res.json({
      success: true,
      message: 'Record deleted successfully'
    });
  });
}

module.exports = BaseController;
