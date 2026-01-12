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

// Client Purchase Order routes
const clientPoRoutes = require('../modules/client-purchase-order/client-po.routes');
router.use('/client-purchase-orders', clientPoRoutes);

// TODO: Add other module routes here

module.exports = router;
