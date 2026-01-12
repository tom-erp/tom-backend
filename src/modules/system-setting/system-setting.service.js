/**
 * SystemSetting Service
 * Business logic for system settings
 */

const systemSettingRepository = require('./system-setting.repository');
const AppError = require('../../utils/errors/AppError');

class SystemSettingService {
  /**
   * Create system setting
   */
  async create(data) {
    // Check if key already exists
    const existing = await systemSettingRepository.findByKey(data.key);
    if (existing) {
      throw new AppError('Setting with this key already exists', 409);
    }

    return systemSettingRepository.create(data);
  }

  /**
   * Find all settings
   */
  async findAll(filters = {}) {
    return systemSettingRepository.findAll(filters);
  }

  /**
   * Find setting by ID
   */
  async findById(id) {
    const setting = await systemSettingRepository.findById(id);
    if (!setting) {
      throw new AppError('System setting not found', 404);
    }
    return setting;
  }

  /**
   * Find setting by key
   */
  async findByKey(key) {
    const setting = await systemSettingRepository.findByKey(key);
    if (!setting) {
      throw new AppError('System setting not found', 404);
    }
    return setting;
  }

  /**
   * Get setting value by key (returns parsed value)
   */
  async getValue(key) {
    const setting = await this.findByKey(key);
    return this.parseValue(setting.value, setting.type);
  }

  /**
   * Parse setting value based on type
   */
  parseValue(value, type) {
    if (value === null || value === undefined) return null;

    switch (type) {
      case 'number':
        return parseFloat(value);
      case 'boolean':
        return value === 'true' || value === true;
      case 'json':
        try {
          return JSON.parse(value);
        } catch (e) {
          return value;
        }
      default:
        return value;
    }
  }

  /**
   * Update system setting
   */
  async update(id, data) {
    const setting = await systemSettingRepository.findById(id);
    if (!setting) {
      throw new AppError('System setting not found', 404);
    }

    // If updating key, check if new key already exists
    if (data.key && data.key !== setting.key) {
      const existing = await systemSettingRepository.findByKey(data.key);
      if (existing) {
        throw new AppError('Setting with this key already exists', 409);
      }
    }

    // Parse value if JSON type
    if (data.value !== undefined && setting.type === 'json') {
      data.value = typeof data.value === 'object' ? JSON.stringify(data.value) : data.value;
    }

    return systemSettingRepository.update(id, data);
  }

  /**
   * Update setting by key
   */
  async updateByKey(key, value, updatedBy = null) {
    const setting = await systemSettingRepository.findByKey(key);
    if (!setting) {
      throw new AppError('System setting not found', 404);
    }

    const parsedValue = setting.type === 'json' && typeof value === 'object'
      ? JSON.stringify(value)
      : value;

    return systemSettingRepository.updateByKey(key, {
      value: parsedValue,
      updated_by: updatedBy,
      updated_at: new Date()
    });
  }

  /**
   * Delete system setting
   */
  async delete(id) {
    const setting = await systemSettingRepository.findById(id);
    if (!setting) {
      throw new AppError('System setting not found', 404);
    }

    await systemSettingRepository.delete(id);
    return { message: 'System setting deleted successfully' };
  }
}

module.exports = new SystemSettingService();
