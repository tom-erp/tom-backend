/**
 * Timesheet Routes
 */

const express = require('express');
const router = express.Router();
const TimesheetController = require('./timesheet.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, TimesheetController.getAll);
// router.get('/:id', authMiddleware, TimesheetController.getById);
// router.post('/', authMiddleware, TimesheetController.create);
// router.put('/:id', authMiddleware, TimesheetController.update);
// router.delete('/:id', authMiddleware, TimesheetController.delete);

module.exports = router;
