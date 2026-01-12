/**
 * SystemSetting Model
 * Table: system_settings
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class SystemSettingModel extends BaseModel {
  constructor() {
    super('system_settings', db);
  }

  /**
   * Find setting by key
   */
  async findByKey(key) {
    return this.db('system_settings')
      .where({ key })
      .first();
  }

  /**
   * Find settings by category
   */
  async findByCategory(category) {
    return this.db('system_settings')
      .where({ category })
      .orderBy('key', 'asc');
  }

  /**
   * Find public settings
   */
  async findPublic() {
    return this.db('system_settings')
      .where({ is_public: true })
      .orderBy('category', 'asc')
      .orderBy('key', 'asc');
  }

  /**
   * Update setting by key
   */
  async updateByKey(key, value, updatedBy = null) {
    return this.db('system_settings')
      .where({ key })
      .update({
        value: typeof value === 'object' ? JSON.stringify(value) : value,
        updated_by: updatedBy,
        updated_at: db.fn.now()
      });
  }
}

module.exports = new SystemSettingModel();
