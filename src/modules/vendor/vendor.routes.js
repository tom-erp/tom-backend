/**
 * Vendor Routes
 */

const express = require('express');
const router = express.Router();
const VendorController = require('./vendor.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, VendorController.getAll);
// router.get('/:id', authMiddleware, VendorController.getById);
// router.post('/', authMiddleware, VendorController.create);
// router.put('/:id', authMiddleware, VendorController.update);
// router.delete('/:id', authMiddleware, VendorController.delete);

module.exports = router;
