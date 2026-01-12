/**
 * Auth Service
 * Handles authentication business logic
 */

const bcrypt = require('bcrypt');
const AuthRepository = require('./auth.repository');
const jwtUtils = require('../../config/jwt');
const AppError = require('../../utils/errors/AppError');
const errorCodes = require('../../utils/errors/errorCodes');

class AuthService {
  constructor() {
    this.repository = new AuthRepository();
  }

  /**
   * Register a new user
   */
  async register(userData) {
    const { email, password, first_name, last_name, role, organization_id } = userData;

    // Check if email already exists
    const emailExists = await this.repository.emailExists(email);
    if (emailExists) {
      throw new AppError('Email already registered', 409, errorCodes.DUPLICATE_ENTRY);
    }

    // Hash password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await this.repository.createUser({
      email,
      password_hash,
      first_name,
      last_name,
      role: role || 'site_engineer', // Default role
      organization_id,
      status: 'active'
    });

    // Remove password hash from response
    delete user.password_hash;

    // Generate JWT token
    const token = jwtUtils.generateToken({ userId: user.id, email: user.email, role: user.role });
    const refreshToken = jwtUtils.generateRefreshToken({ userId: user.id });

    return {
      user,
      token,
      refreshToken
    };
  }

  /**
   * Login user
   */
  async login(email, password) {
    // Find user by email
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid email or password', 401, errorCodes.UNAUTHORIZED);
    }

    // Check if user is active
    if (user.status !== 'active') {
      throw new AppError('Account is not active', 401, errorCodes.UNAUTHORIZED);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401, errorCodes.UNAUTHORIZED);
    }

    // Update last login
    await this.repository.updateLastLogin(user.id);

    // Remove password hash from response
    delete user.password_hash;

    // Generate JWT tokens
    const token = jwtUtils.generateToken({ userId: user.id, email: user.email, role: user.role });
    const refreshToken = jwtUtils.generateRefreshToken({ userId: user.id });

    return {
      user,
      token,
      refreshToken
    };
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken) {
    try {
      const decoded = jwtUtils.verifyToken(refreshToken);
      const user = await this.repository.findById(decoded.userId);
      
      if (!user || user.status !== 'active') {
        throw new AppError('Invalid refresh token', 401, errorCodes.UNAUTHORIZED);
      }

      // Generate new tokens
      const token = jwtUtils.generateToken({ userId: user.id, email: user.email, role: user.role });
      const newRefreshToken = jwtUtils.generateRefreshToken({ userId: user.id });

      return {
        token,
        refreshToken: newRefreshToken
      };
    } catch (error) {
      throw new AppError('Invalid refresh token', 401, errorCodes.UNAUTHORIZED);
    }
  }

  /**
   * Get current user profile
   */
  async getProfile(userId) {
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404, errorCodes.NOT_FOUND);
    }

    delete user.password_hash;
    return user;
  }
}

module.exports = AuthService;
