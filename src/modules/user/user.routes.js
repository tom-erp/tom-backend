/**
 * User Routes
 * User management endpoints
 */

const express = require('express');
const router = express.Router();
const UserController = require('./user.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const { validate } = require('../../middlewares/validator.middleware');
const { createUserSchema, updateUserSchema } = require('./user.validator');

// All routes require authentication
router.use(authMiddleware);

/**
 * @route   GET /users
 * @desc    Get all users
 * @access  Private
 */
router.get('/', UserController.findAll);

/**
 * @route   GET /users/role/:role
 * @desc    Get users by role
 * @access  Private
 */
router.get('/role/:role', UserController.findByRole);

/**
 * @route   GET /users/organization/:organizationId
 * @desc    Get users by organization
 * @access  Private
 */
router.get('/organization/:organizationId', UserController.findByOrganization);

/**
 * @route   GET /users/:id
 * @desc    Get user by ID
 * @access  Private
 */
router.get('/:id', UserController.findById);

/**
 * @route   GET /users/:id/organization
 * @desc    Get user with organization details
 * @access  Private
 */
router.get('/:id/organization', UserController.findWithOrganization);

/**
 * @route   POST /users
 * @desc    Create new user
 * @access  Private (Admin only - add authorization middleware later)
 */
router.post('/', validate(createUserSchema), UserController.create);

/**
 * @route   PUT /users/:id
 * @desc    Update user
 * @access  Private
 */
router.put('/:id', validate(updateUserSchema), UserController.update);

/**
 * @route   DELETE /users/:id
 * @desc    Delete user
 * @access  Private (Admin only - add authorization middleware later)
 */
router.delete('/:id', UserController.delete);

module.exports = router;
