/**
 * Base Model
 * Provides common model functionality for all modules
 */

class BaseModel {
  constructor(tableName, db) {
    this.tableName = tableName;
    this.db = db;
  }

  async findAll(filters = {}) {
    return this.db(this.tableName).where(filters).whereNull('deleted_at');
  }

  async findById(id) {
    return this.db(this.tableName)
      .where({ id })
      .whereNull('deleted_at')
      .first();
  }

  async create(data) {
    const [record] = await this.db(this.tableName)
      .insert({
        ...data,
        created_at: this.db.fn.now(),
        updated_at: this.db.fn.now()
      })
      .returning('*');
    return record;
  }

  async update(id, data) {
    const [record] = await this.db(this.tableName)
      .where({ id })
      .whereNull('deleted_at')
      .update({
        ...data,
        updated_at: this.db.fn.now()
      })
      .returning('*');
    return record;
  }

  async delete(id) {
    return this.db(this.tableName)
      .where({ id })
      .update({ deleted_at: this.db.fn.now() });
  }

  async hardDelete(id) {
    return this.db(this.tableName).where({ id }).del();
  }
}

module.exports = BaseModel;
