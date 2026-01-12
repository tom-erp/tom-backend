/**
 * User Repository
 * Handles database queries for users
 */

const db = require('../../config/database');
const UserModel = require('./user.model');

class UserRepository {
  /**
   * Find all users with optional filters
   */
  async findAll(filters = {}) {
    return UserModel.findAll(filters);
  }

  /**
   * Find user by ID
   */
  async findById(id) {
    return UserModel.findById(id);
  }

  /**
   * Find user by email
   */
  async findByEmail(email) {
    return UserModel.findByEmail(email);
  }

  /**
   * Find users by role
   */
  async findByRole(role) {
    return UserModel.findByRole(role);
  }

  /**
   * Find users by organization
   */
  async findByOrganization(organizationId) {
    return UserModel.findByOrganization(organizationId);
  }

  /**
   * Find active users
   */
  async findActive() {
    return UserModel.findActive();
  }

  /**
   * Create new user
   */
  async create(userData) {
    return UserModel.create(userData);
  }

  /**
   * Update user
   */
  async update(id, userData) {
    return UserModel.update(id, userData);
  }

  /**
   * Delete user (soft delete)
   */
  async delete(id) {
    return UserModel.delete(id);
  }

  /**
   * Find user with organization details
   */
  async findWithOrganization(id) {
    const user = await db('users')
      .leftJoin('organizations', 'users.organization_id', 'organizations.id')
      .where('users.id', id)
      .whereNull('users.deleted_at')
      .select(
        'users.*',
        'organizations.name as organization_name',
        'organizations.code as organization_code'
      )
      .first();
    
    return user;
  }
}

module.exports = UserRepository;
