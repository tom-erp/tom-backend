/**
 * SystemSetting Repository
 * Database queries for system settings
 */

const db = require('../../config/database');

class SystemSettingRepository {
  /**
   * Create system setting
   */
  async create(data) {
    const [setting] = await db('system_settings')
      .insert(data)
      .returning('*');
    return setting;
  }

  /**
   * Find all settings
   */
  async findAll(filters = {}) {
    const query = db('system_settings')
      .select('system_settings.*', 'users.email as updated_by_email')
      .leftJoin('users', 'system_settings.updated_by', 'users.id')
      .orderBy('system_settings.category', 'asc')
      .orderBy('system_settings.key', 'asc');

    if (filters.category) {
      query.where('system_settings.category', filters.category);
    }

    if (filters.is_public !== undefined) {
      query.where('system_settings.is_public', filters.is_public);
    }

    return query;
  }

  /**
   * Find setting by ID
   */
  async findById(id) {
    return db('system_settings')
      .select('system_settings.*', 'users.email as updated_by_email')
      .leftJoin('users', 'system_settings.updated_by', 'users.id')
      .where('system_settings.id', id)
      .first();
  }

  /**
   * Find setting by key
   */
  async findByKey(key) {
    return db('system_settings')
      .where({ key })
      .first();
  }

  /**
   * Update system setting
   */
  async update(id, data) {
    const [setting] = await db('system_settings')
      .where({ id })
      .update(data)
      .returning('*');
    return setting;
  }

  /**
   * Update setting by key
   */
  async updateByKey(key, data) {
    const [setting] = await db('system_settings')
      .where({ key })
      .update(data)
      .returning('*');
    return setting;
  }

  /**
   * Delete system setting
   */
  async delete(id) {
    return db('system_settings')
      .where({ id })
      .del();
  }
}

module.exports = new SystemSettingRepository();
