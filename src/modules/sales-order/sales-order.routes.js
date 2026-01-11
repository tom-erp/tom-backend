/**
 * Sales Order Routes
 */

const express = require('express');
const router = express.Router();
const Sales_OrderController = require('./sales-order.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, Sales_OrderController.getAll);
// router.get('/:id', authMiddleware, Sales_OrderController.getById);
// router.post('/', authMiddleware, Sales_OrderController.create);
// router.put('/:id', authMiddleware, Sales_OrderController.update);
// router.delete('/:id', authMiddleware, Sales_OrderController.delete);

module.exports = router;
