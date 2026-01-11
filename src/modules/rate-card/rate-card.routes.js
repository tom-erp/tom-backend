/**
 * Rate Card Routes
 */

const express = require('express');
const router = express.Router();
const Rate_CardController = require('./rate-card.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, Rate_CardController.getAll);
// router.get('/:id', authMiddleware, Rate_CardController.getById);
// router.post('/', authMiddleware, Rate_CardController.create);
// router.put('/:id', authMiddleware, Rate_CardController.update);
// router.delete('/:id', authMiddleware, Rate_CardController.delete);

module.exports = router;
