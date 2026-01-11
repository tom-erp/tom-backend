/**
 * Item Receipt Routes
 */

const express = require('express');
const router = express.Router();
const Item_ReceiptController = require('./item-receipt.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, Item_ReceiptController.getAll);
// router.get('/:id', authMiddleware, Item_ReceiptController.getById);
// router.post('/', authMiddleware, Item_ReceiptController.create);
// router.put('/:id', authMiddleware, Item_ReceiptController.update);
// router.delete('/:id', authMiddleware, Item_ReceiptController.delete);

module.exports = router;
