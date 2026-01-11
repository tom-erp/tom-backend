/**
 * Organization Routes
 */

const express = require('express');
const router = express.Router();
const OrganizationController = require('./organization.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, OrganizationController.getAll);
// router.get('/:id', authMiddleware, OrganizationController.getById);
// router.post('/', authMiddleware, OrganizationController.create);
// router.put('/:id', authMiddleware, OrganizationController.update);
// router.delete('/:id', authMiddleware, OrganizationController.delete);

module.exports = router;
