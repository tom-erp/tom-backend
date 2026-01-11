/**
 * Vendor Prepayment Routes
 */

const express = require('express');
const router = express.Router();
const Vendor_PrepaymentController = require('./vendor-prepayment.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, Vendor_PrepaymentController.getAll);
// router.get('/:id', authMiddleware, Vendor_PrepaymentController.getById);
// router.post('/', authMiddleware, Vendor_PrepaymentController.create);
// router.put('/:id', authMiddleware, Vendor_PrepaymentController.update);
// router.delete('/:id', authMiddleware, Vendor_PrepaymentController.delete);

module.exports = router;
