/**
 * Auth Controller
 * HTTP request/response handling for authentication
 */

const asyncHandler = require('../../utils/helpers/async-handler');
const AuthService = require('./auth.service');

class AuthController {
  constructor() {
    this.service = new AuthService();
  }

  /**
   * Register new user
   * POST /auth/register
   */
  register = asyncHandler(async (req, res) => {
    const result = await this.service.register(req.body);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result
    });
  });

  /**
   * Login user
   * POST /auth/login
   */
  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await this.service.login(email, password);
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result
    });
  });

  /**
   * Refresh access token
   * POST /auth/refresh
   */
  refreshToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    const result = await this.service.refreshToken(refreshToken);
    
    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: result
    });
  });

  /**
   * Get current user profile
   * GET /auth/me
   */
  getProfile = asyncHandler(async (req, res) => {
    const user = await this.service.getProfile(req.user.id);
    
    res.status(200).json({
      success: true,
      data: user
    });
  });
}

module.exports = new AuthController();
