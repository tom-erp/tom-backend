/**
 * GRN Routes
 */

const express = require('express');
const router = express.Router();
const GrnController = require('./grn.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, GrnController.getAll);
// router.get('/:id', authMiddleware, GrnController.getById);
// router.post('/', authMiddleware, GrnController.create);
// router.put('/:id', authMiddleware, GrnController.update);
// router.delete('/:id', authMiddleware, GrnController.delete);

module.exports = router;
