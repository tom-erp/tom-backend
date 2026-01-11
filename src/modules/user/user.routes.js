/**
 * User Routes
 */

const express = require('express');
const router = express.Router();
const UserController = require('./user.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, UserController.getAll);
// router.get('/:id', authMiddleware, UserController.getById);
// router.post('/', authMiddleware, UserController.create);
// router.put('/:id', authMiddleware, UserController.update);
// router.delete('/:id', authMiddleware, UserController.delete);

module.exports = router;
