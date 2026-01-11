/**
 * Purchase Order Routes
 */

const express = require('express');
const router = express.Router();
const PoController = require('./po.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, PoController.getAll);
// router.get('/:id', authMiddleware, PoController.getById);
// router.post('/', authMiddleware, PoController.create);
// router.put('/:id', authMiddleware, PoController.update);
// router.delete('/:id', authMiddleware, PoController.delete);

module.exports = router;
