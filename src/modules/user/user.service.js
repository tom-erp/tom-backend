/**
 * User Service
 * Handles business logic for users
 */

const bcrypt = require('bcrypt');
const UserRepository = require('./user.repository');
const AppError = require('../../utils/errors/AppError');
const errorCodes = require('../../utils/errors/errorCodes');

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  /**
   * Get all users
   */
  async findAll(filters = {}) {
    const users = await this.repository.findAll(filters);
    // Remove password hashes from response
    return users.map(user => {
      const { password_hash: _password_hash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  /**
   * Get user by ID
   */
  async findById(id) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new AppError('User not found', 404, errorCodes.NOT_FOUND);
    }

    delete user.password_hash;
    return user;
  }

  /**
   * Get user with organization details
   */
  async findWithOrganization(id) {
    const user = await this.repository.findWithOrganization(id);
    if (!user) {
      throw new AppError('User not found', 404, errorCodes.NOT_FOUND);
    }

    delete user.password_hash;
    return user;
  }

  /**
   * Create new user
   */
  async create(userData) {
    const { email, password, ...rest } = userData;

    // Check if email already exists
    const existingUser = await this.repository.findByEmail(email);
    if (existingUser) {
      throw new AppError('Email already registered', 409, errorCodes.DUPLICATE_ENTRY);
    }

    // Hash password if provided
    let password_hash = null;
    if (password) {
      const saltRounds = 10;
      password_hash = await bcrypt.hash(password, saltRounds);
    }

    // Create user
    const user = await this.repository.create({
      ...rest,
      email,
      password_hash,
      status: rest.status || 'active'
    });

    delete user.password_hash;
    return user;
  }

  /**
   * Update user
   */
  async update(id, userData) {
    const existingUser = await this.repository.findById(id);
    if (!existingUser) {
      throw new AppError('User not found', 404, errorCodes.NOT_FOUND);
    }

    const { password, email, ...rest } = userData;

    // Check if email is being changed and if it already exists
    if (email && email !== existingUser.email) {
      const emailExists = await this.repository.findByEmail(email);
      if (emailExists) {
        throw new AppError('Email already registered', 409, errorCodes.DUPLICATE_ENTRY);
      }
      rest.email = email;
    }

    // Hash password if provided
    if (password) {
      const saltRounds = 10;
      rest.password_hash = await bcrypt.hash(password, saltRounds);
    }

    const user = await this.repository.update(id, rest);
    delete user.password_hash;
    return user;
  }

  /**
   * Delete user (soft delete)
   */
  async delete(id) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new AppError('User not found', 404, errorCodes.NOT_FOUND);
    }

    await this.repository.delete(id);
    return { message: 'User deleted successfully' };
  }

  /**
   * Get users by role
   */
  async findByRole(role) {
    const users = await this.repository.findByRole(role);
    return users.map(user => {
      const { password_hash: _password_hash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  /**
   * Get users by organization
   */
  async findByOrganization(organizationId) {
    const users = await this.repository.findByOrganization(organizationId);
    return users.map(user => {
      const { password_hash: _password_hash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }
}

module.exports = UserService;
