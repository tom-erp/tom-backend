/**
 * Attendance Routes
 */

const express = require('express');
const router = express.Router();
const AttendanceController = require('./attendance.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, AttendanceController.getAll);
// router.get('/:id', authMiddleware, AttendanceController.getById);
// router.post('/', authMiddleware, AttendanceController.create);
// router.put('/:id', authMiddleware, AttendanceController.update);
// router.delete('/:id', authMiddleware, AttendanceController.delete);

module.exports = router;
