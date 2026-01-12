/**
 * Client Purchase Order Routes
 */

const express = require('express');
const router = express.Router();
const ClientPoController = require('./client-po.controller');
const { createSchema, updateSchema, acknowledgeSchema, statusUpdateSchema } = require('./client-po.validator');
const { validate } = require('../../middlewares/validator.middleware');
// const authMiddleware = require('../../middlewares/auth.middleware');

// Basic CRUD routes
router.get('/', ClientPoController.getAll);
router.get('/:id', ClientPoController.getById);
router.post('/', validate(createSchema), ClientPoController.create);
router.put('/:id', validate(updateSchema), ClientPoController.update);
router.delete('/:id', ClientPoController.delete);

// Specific routes
router.get('/client/:clientId', ClientPoController.getByClient);
router.get('/project/:projectId', ClientPoController.getByProject);
router.get('/po-number/:poNumber', ClientPoController.getByPONumber);
router.get('/status/:status', ClientPoController.getByStatus);
router.get('/:id/with-items', ClientPoController.getWithItems);

// Action routes
router.patch('/:id/acknowledge', validate(acknowledgeSchema), ClientPoController.acknowledge);
router.patch('/:id/status', validate(statusUpdateSchema), ClientPoController.updateStatus);

module.exports = router;
