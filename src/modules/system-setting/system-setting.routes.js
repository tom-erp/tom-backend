/**
 * SystemSetting Routes
 * Route definitions for system settings
 */

const express = require('express');
const router = express.Router();
const systemSettingController = require('./system-setting.controller');
const { validate } = require('../../middlewares/validator.middleware');
const { authenticate } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/authorization.middleware');
const systemSettingValidator = require('./system-setting.validator');

// Get public settings (no auth required)
router.get(
  '/public',
  systemSettingController.getAll
);

// Get setting value by key (public endpoint)
router.get(
  '/key/:key/value',
  systemSettingController.getValueByKey
);

// All other routes require authentication
router.use(authenticate);

// Get all system settings
router.get(
  '/',
  authorize(['admin']),
  validate(systemSettingValidator.getSystemSettings),
  systemSettingController.getAll
);

// Get system setting by ID
router.get(
  '/:id',
  authorize(['admin']),
  systemSettingController.getById
);

// Get system setting by key
router.get(
  '/key/:key',
  authorize(['admin']),
  systemSettingController.getByKey
);

// Create system setting
router.post(
  '/',
  authorize(['admin']),
  validate(systemSettingValidator.createSystemSetting),
  systemSettingController.create
);

// Update system setting
router.put(
  '/:id',
  authorize(['admin']),
  validate(systemSettingValidator.updateSystemSetting),
  systemSettingController.update
);

// Update system setting by key
router.put(
  '/key/:key',
  authorize(['admin']),
  systemSettingController.updateByKey
);

// Delete system setting
router.delete(
  '/:id',
  authorize(['admin']),
  systemSettingController.delete
);

module.exports = router;
