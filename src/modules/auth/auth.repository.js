/**
 * Auth Repository
 * Handles database queries for authentication
 */

const UserModel = require('../user/user.model');

class AuthRepository {
  /**
   * Find user by email for login
   */
  async findByEmail(email) {
    return UserModel.findByEmail(email);
  }

  /**
   * Find user by ID
   */
  async findById(id) {
    return UserModel.findById(id);
  }

  /**
   * Create new user (registration)
   */
  async createUser(userData) {
    return UserModel.create(userData);
  }

  /**
   * Update user
   */
  async updateUser(id, userData) {
    return UserModel.update(id, userData);
  }

  /**
   * Update last login timestamp
   */
  async updateLastLogin(userId) {
    return UserModel.updateLastLogin(userId);
  }

  /**
   * Check if email exists
   */
  async emailExists(email) {
    const user = await UserModel.findByEmail(email);
    return !!user;
  }
}

module.exports = AuthRepository;
