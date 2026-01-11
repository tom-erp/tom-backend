/**
 * Item Routes
 */

const express = require('express');
const router = express.Router();
const ItemController = require('./item.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, ItemController.getAll);
// router.get('/:id', authMiddleware, ItemController.getById);
// router.post('/', authMiddleware, ItemController.create);
// router.put('/:id', authMiddleware, ItemController.update);
// router.delete('/:id', authMiddleware, ItemController.delete);

module.exports = router;
