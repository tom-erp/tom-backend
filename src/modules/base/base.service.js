/**
 * Base Service
 * Provides common service functionality for all modules
 */

class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async findAll(filters = {}) {
    return this.repository.findAll(filters);
  }

  async findById(id) {
    const record = await this.repository.findById(id);
    if (!record) {
      throw new Error('Record not found');
    }
    return record;
  }

  async create(data) {
    return this.repository.create(data);
  }

  async update(id, data) {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new Error('Record not found');
    }
    return this.repository.update(id, data);
  }

  async delete(id) {
    return this.repository.delete(id);
  }
}

module.exports = BaseService;
