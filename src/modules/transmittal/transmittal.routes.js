/**
 * Transmittal Routes
 */

const express = require('express');
const router = express.Router();
const TransmittalController = require('./transmittal.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, TransmittalController.getAll);
// router.get('/:id', authMiddleware, TransmittalController.getById);
// router.post('/', authMiddleware, TransmittalController.create);
// router.put('/:id', authMiddleware, TransmittalController.update);
// router.delete('/:id', authMiddleware, TransmittalController.delete);

module.exports = router;
