/**
 * WIP Routes
 */

const express = require('express');
const router = express.Router();
const WipController = require('./wip.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, WipController.getAll);
// router.get('/:id', authMiddleware, WipController.getById);
// router.post('/', authMiddleware, WipController.create);
// router.put('/:id', authMiddleware, WipController.update);
// router.delete('/:id', authMiddleware, WipController.delete);

module.exports = router;
