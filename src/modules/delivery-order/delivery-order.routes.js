/**
 * Delivery Order Routes
 */

const express = require('express');
const router = express.Router();
const Delivery_OrderController = require('./delivery-order.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, Delivery_OrderController.getAll);
// router.get('/:id', authMiddleware, Delivery_OrderController.getById);
// router.post('/', authMiddleware, Delivery_OrderController.create);
// router.put('/:id', authMiddleware, Delivery_OrderController.update);
// router.delete('/:id', authMiddleware, Delivery_OrderController.delete);

module.exports = router;
