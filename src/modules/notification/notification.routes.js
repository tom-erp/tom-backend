/**
 * Notification Routes
 */

const express = require('express');
const router = express.Router();
const NotificationController = require('./notification.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, NotificationController.getAll);
// router.get('/:id', authMiddleware, NotificationController.getById);
// router.post('/', authMiddleware, NotificationController.create);
// router.put('/:id', authMiddleware, NotificationController.update);
// router.delete('/:id', authMiddleware, NotificationController.delete);

module.exports = router;
