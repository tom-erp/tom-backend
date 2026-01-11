/**
 * Project Schedule Routes
 */

const express = require('express');
const router = express.Router();
const Project_ScheduleController = require('./project-schedule.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, Project_ScheduleController.getAll);
// router.get('/:id', authMiddleware, Project_ScheduleController.getById);
// router.post('/', authMiddleware, Project_ScheduleController.create);
// router.put('/:id', authMiddleware, Project_ScheduleController.update);
// router.delete('/:id', authMiddleware, Project_ScheduleController.delete);

module.exports = router;
