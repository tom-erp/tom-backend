/**
 * User Model
 * Table: users
 */

const BaseModel = require('../base/base.model');
const db = require('../../config/database');

class UserModel extends BaseModel {
  constructor() {
    super('users', db);
  }

  /**
   * Find user by email
   */
  async findByEmail(email) {
    return this.db('users')
      .where({ email })
      .whereNull('deleted_at')
      .first();
  }

  /**
   * Find users by role
   */
  async findByRole(role) {
    return this.db('users')
      .where({ role })
      .whereNull('deleted_at');
  }

  /**
   * Find users by organization
   */
  async findByOrganization(organizationId) {
    return this.db('users')
      .where({ organization_id: organizationId })
      .whereNull('deleted_at');
  }

  /**
   * Find active users
   */
  async findActive() {
    return this.db('users')
      .where({ status: 'active' })
      .whereNull('deleted_at');
  }

  /**
   * Update last login timestamp
   */
  async updateLastLogin(userId) {
    return this.db('users')
      .where({ id: userId })
      .update({
        last_login_at: this.db.fn.now(),
        updated_at: this.db.fn.now()
      });
  }
}

module.exports = new UserModel();
