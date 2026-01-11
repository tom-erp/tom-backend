/**
 * Customer Invoice Routes
 */

const express = require('express');
const router = express.Router();
const Customer_InvoiceController = require('./customer-invoice.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, Customer_InvoiceController.getAll);
// router.get('/:id', authMiddleware, Customer_InvoiceController.getById);
// router.post('/', authMiddleware, Customer_InvoiceController.create);
// router.put('/:id', authMiddleware, Customer_InvoiceController.update);
// router.delete('/:id', authMiddleware, Customer_InvoiceController.delete);

module.exports = router;
