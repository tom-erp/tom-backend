/**
 * Document Routes
 */

const express = require('express');
const router = express.Router();
const DocumentController = require('./document.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, DocumentController.getAll);
// router.get('/:id', authMiddleware, DocumentController.getById);
// router.post('/', authMiddleware, DocumentController.create);
// router.put('/:id', authMiddleware, DocumentController.update);
// router.delete('/:id', authMiddleware, DocumentController.delete);

module.exports = router;
