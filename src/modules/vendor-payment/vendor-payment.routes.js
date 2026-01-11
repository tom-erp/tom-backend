/**
 * Vendor Payment Routes
 */

const express = require('express');
const router = express.Router();
const Vendor_PaymentController = require('./vendor-payment.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, Vendor_PaymentController.getAll);
// router.get('/:id', authMiddleware, Vendor_PaymentController.getById);
// router.post('/', authMiddleware, Vendor_PaymentController.create);
// router.put('/:id', authMiddleware, Vendor_PaymentController.update);
// router.delete('/:id', authMiddleware, Vendor_PaymentController.delete);

module.exports = router;
