/**
 * Project Routes
 */

const express = require('express');
const router = express.Router();
const ProjectController = require('./project.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, ProjectController.getAll);
// router.get('/:id', authMiddleware, ProjectController.getById);
// router.post('/', authMiddleware, ProjectController.create);
// router.put('/:id', authMiddleware, ProjectController.update);
// router.delete('/:id', authMiddleware, ProjectController.delete);

module.exports = router;
