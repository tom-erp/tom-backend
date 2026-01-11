/**
 * Voucher Routes
 */

const express = require('express');
const router = express.Router();
const VoucherController = require('./voucher.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, VoucherController.getAll);
// router.get('/:id', authMiddleware, VoucherController.getById);
// router.post('/', authMiddleware, VoucherController.create);
// router.put('/:id', authMiddleware, VoucherController.update);
// router.delete('/:id', authMiddleware, VoucherController.delete);

module.exports = router;
