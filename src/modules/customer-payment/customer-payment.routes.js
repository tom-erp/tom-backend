/**
 * Customer Payment Routes
 */

const express = require('express');
const router = express.Router();
const Customer_PaymentController = require('./customer-payment.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, Customer_PaymentController.getAll);
// router.get('/:id', authMiddleware, Customer_PaymentController.getById);
// router.post('/', authMiddleware, Customer_PaymentController.create);
// router.put('/:id', authMiddleware, Customer_PaymentController.update);
// router.delete('/:id', authMiddleware, Customer_PaymentController.delete);

module.exports = router;
