// /backend/routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');

// Service routes
router.get('/', getServices); // Get all services
router.get('/:id', getServiceById); // Get single service by ID
router.post('/', createService); // Create a new service
router.put('/:id', updateService); // Update a service
router.delete('/:id', deleteService); // Delete a service

module.exports = router;
