/**
 * Client Purchase Order Routes
 */

const express = require('express');
const router = express.Router();
const Client_PoController = require('./client-po.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, Client_PoController.getAll);
// router.get('/:id', authMiddleware, Client_PoController.getById);
// router.post('/', authMiddleware, Client_PoController.create);
// router.put('/:id', authMiddleware, Client_PoController.update);
// router.delete('/:id', authMiddleware, Client_PoController.delete);

module.exports = router;
