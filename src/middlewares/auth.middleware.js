/**
 * Authentication Middleware
 * Verifies JWT token and attaches user to request
 */

const jwtUtils = require('../config/jwt');
const AppError = require('../utils/errors/AppError');
const errorCodes = require('../utils/errors/errorCodes');
const UserModel = require('../modules/user/user.model');

/**
 * Verify JWT token and attach user to request
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401, errorCodes.UNAUTHORIZED);
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    let decoded;
    try {
      decoded = jwtUtils.verifyToken(token);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new AppError('Token expired', 401, errorCodes.TOKEN_EXPIRED);
      }
      throw new AppError('Invalid token', 401, errorCodes.INVALID_TOKEN);
    }

    // Get user from database
    const user = await UserModel.findById(decoded.userId);
    if (!user || user.status !== 'active') {
      throw new AppError('User not found or inactive', 401, errorCodes.UNAUTHORIZED);
    }

    // Attach user to request
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      organization_id: user.organization_id
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
