/**
 * Vendor Bill Routes
 */

const express = require('express');
const router = express.Router();
const Vendor_BillController = require('./vendor-bill.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, Vendor_BillController.getAll);
// router.get('/:id', authMiddleware, Vendor_BillController.getById);
// router.post('/', authMiddleware, Vendor_BillController.create);
// router.put('/:id', authMiddleware, Vendor_BillController.update);
// router.delete('/:id', authMiddleware, Vendor_BillController.delete);

module.exports = router;
