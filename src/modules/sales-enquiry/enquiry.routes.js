/**
 * Sales Enquiry Routes
 */

const express = require('express');
const router = express.Router();
const EnquiryController = require('./enquiry.controller');
// const authMiddleware = require('../../middlewares/auth.middleware');

// TODO: Add authentication and authorization middleware
// router.get('/', authMiddleware, EnquiryController.getAll);
// router.get('/:id', authMiddleware, EnquiryController.getById);
// router.post('/', authMiddleware, EnquiryController.create);
// router.put('/:id', authMiddleware, EnquiryController.update);
// router.delete('/:id', authMiddleware, EnquiryController.delete);

module.exports = router;
