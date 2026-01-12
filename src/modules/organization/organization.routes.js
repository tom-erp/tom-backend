/**
 * Organization Routes
 * Organization management endpoints
 */

const express = require('express');
const router = express.Router();
const OrganizationController = require('./organization.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const { validate } = require('../../middlewares/validator.middleware');
const { createSchema, updateSchema } = require('./organization.validator');

// All routes require authentication
router.use(authMiddleware);

/**
 * @route   GET /organizations
 * @desc    Get all organizations
 * @access  Private
 */
router.get('/', OrganizationController.getAll);

/**
 * @route   GET /organizations/:id
 * @desc    Get organization by ID
 * @access  Private
 */
router.get('/:id', OrganizationController.getById);

/**
 * @route   POST /organizations
 * @desc    Create new organization
 * @access  Private (Admin only - add authorization middleware later)
 */
router.post('/', validate(createSchema), OrganizationController.create);

/**
 * @route   PUT /organizations/:id
 * @desc    Update organization
 * @access  Private
 */
router.put('/:id', validate(updateSchema), OrganizationController.update);

/**
 * @route   DELETE /organizations/:id
 * @desc    Delete organization
 * @access  Private (Admin only - add authorization middleware later)
 */
router.delete('/:id', OrganizationController.delete);

module.exports = router;
