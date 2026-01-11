/**
 * Project Task Routes
 */

const express = require('express');
const router = express.Router();
const Project_TaskController = require('./project-task.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, Project_TaskController.getAll);
// router.get('/:id', authMiddleware, Project_TaskController.getById);
// router.post('/', authMiddleware, Project_TaskController.create);
// router.put('/:id', authMiddleware, Project_TaskController.update);
// router.delete('/:id', authMiddleware, Project_TaskController.delete);

module.exports = router;
