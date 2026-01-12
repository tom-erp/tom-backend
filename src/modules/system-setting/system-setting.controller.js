/**
 * SystemSetting Controller
 * HTTP request/response handling for system settings
 */

const systemSettingService = require('./system-setting.service');
const asyncHandler = require('../../utils/helpers/async-handler');

class SystemSettingController {
  /**
   * Get all system settings
   * GET /api/v1/system-settings
   */
  getAll = asyncHandler(async (req, res) => {
    const filters = {
      category: req.query.category,
      is_public: req.query.is_public !== undefined ? req.query.is_public === 'true' : undefined
    };

    const settings = await systemSettingService.findAll(filters);

    res.json({
      success: true,
      data: settings
    });
  });

  /**
   * Get system setting by ID
   * GET /api/v1/system-settings/:id
   */
  getById = asyncHandler(async (req, res) => {
    const setting = await systemSettingService.findById(req.params.id);

    res.json({
      success: true,
      data: setting
    });
  });

  /**
   * Get system setting by key
   * GET /api/v1/system-settings/key/:key
   */
  getByKey = asyncHandler(async (req, res) => {
    const setting = await systemSettingService.findByKey(req.params.key);

    res.json({
      success: true,
      data: setting
    });
  });

  /**
   * Get setting value by key
   * GET /api/v1/system-settings/key/:key/value
   */
  getValueByKey = asyncHandler(async (req, res) => {
    const value = await systemSettingService.getValue(req.params.key);

    res.json({
      success: true,
      data: { key: req.params.key, value }
    });
  });

  /**
   * Create system setting
   * POST /api/v1/system-settings
   */
  create = asyncHandler(async (req, res) => {
    const setting = await systemSettingService.create({
      ...req.body,
      updated_by: req.user?.id
    });

    res.status(201).json({
      success: true,
      message: 'System setting created successfully',
      data: setting
    });
  });

  /**
   * Update system setting
   * PUT /api/v1/system-settings/:id
   */
  update = asyncHandler(async (req, res) => {
    const setting = await systemSettingService.update(req.params.id, {
      ...req.body,
      updated_by: req.user?.id
    });

    res.json({
      success: true,
      message: 'System setting updated successfully',
      data: setting
    });
  });

  /**
   * Update system setting by key
   * PUT /api/v1/system-settings/key/:key
   */
  updateByKey = asyncHandler(async (req, res) => {
    const setting = await systemSettingService.updateByKey(
      req.params.key,
      req.body.value,
      req.user?.id
    );

    res.json({
      success: true,
      message: 'System setting updated successfully',
      data: setting
    });
  });

  /**
   * Delete system setting
   * DELETE /api/v1/system-settings/:id
   */
  delete = asyncHandler(async (req, res) => {
    await systemSettingService.delete(req.params.id);

    res.json({
      success: true,
      message: 'System setting deleted successfully'
    });
  });
}

module.exports = new SystemSettingController();
