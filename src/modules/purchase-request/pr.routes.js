/**
 * Purchase Request Routes
 */

const express = require('express');
const router = express.Router();
const PrController = require('./pr.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, PrController.getAll);
// router.get('/:id', authMiddleware, PrController.getById);
// router.post('/', authMiddleware, PrController.create);
// router.put('/:id', authMiddleware, PrController.update);
// router.delete('/:id', authMiddleware, PrController.delete);

module.exports = router;
