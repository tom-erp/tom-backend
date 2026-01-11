/**
 * Communication Log Routes
 */

const express = require('express');
const router = express.Router();
const Communication_LogController = require('./communication-log.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, Communication_LogController.getAll);
// router.get('/:id', authMiddleware, Communication_LogController.getById);
// router.post('/', authMiddleware, Communication_LogController.create);
// router.put('/:id', authMiddleware, Communication_LogController.update);
// router.delete('/:id', authMiddleware, Communication_LogController.delete);

module.exports = router;
