/**
 * Main Routes
 * Aggregates all module routes
 */

const express = require('express');
const router = express.Router();

// Auth routes (public)
const authRoutes = require('../modules/auth/auth.routes');
router.use('/auth', authRoutes);

// User routes (protected)
const userRoutes = require('../modules/user/user.routes');
router.use('/users', userRoutes);

// Organization routes (protected)
const organizationRoutes = require('../modules/organization/organization.routes');
router.use('/organizations', organizationRoutes);

// TODO: Add other module routes here

module.exports = router;
