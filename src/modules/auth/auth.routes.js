/**
 * Auth Routes
 */

const express = require('express');
const router = express.Router();
const AuthController = require('./auth.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, AuthController.getAll);
// router.get('/:id', authMiddleware, AuthController.getById);
// router.post('/', authMiddleware, AuthController.create);
// router.put('/:id', authMiddleware, AuthController.update);
// router.delete('/:id', authMiddleware, AuthController.delete);

module.exports = router;
