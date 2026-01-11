/**
 * Sales Quotation Routes
 */

const express = require('express');
const router = express.Router();
const QuotationController = require('./quotation.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, QuotationController.getAll);
// router.get('/:id', authMiddleware, QuotationController.getById);
// router.post('/', authMiddleware, QuotationController.create);
// router.put('/:id', authMiddleware, QuotationController.update);
// router.delete('/:id', authMiddleware, QuotationController.delete);

module.exports = router;
