const jwt = require('jsonwebtoken');
const config = require('./env');

const generateToken = (payload, expiresIn = config.JWT_EXPIRES_IN) => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: config.JWT_REFRESH_EXPIRES_IN });
};

const verifyToken = (token) => {
  return jwt.verify(token, config.JWT_SECRET);
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken
};
