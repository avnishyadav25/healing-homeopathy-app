const express = require('express');
const router = express.Router();
const {
  getServices,
  getServiceById, // Import the new controller function
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');

// Get all services
router.get('/', getServices);

// Get a single service by ID
router.get('/:id', getServiceById); // New route to get a service by ID

// Create a new service
router.post('/', createService);

// Update a service
router.put('/:id', updateService);

// Delete a service
router.delete('/:id', deleteService);

module.exports = router; 
