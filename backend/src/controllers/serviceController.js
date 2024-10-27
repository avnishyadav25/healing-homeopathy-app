// /backend/controllers/serviceController.js
const Service = require('../models/Service');

// Get all services
const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    
   // console.log("#### services", JSON.stringify(services));
    res.status(200).json(services);
    //res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error });
  }
};

// Get a single service by ID
const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findById(id);
    //console.log("#### service", JSON.stringify(service));
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service', error });
  }
};


// Create a new service
const createService = async (req, res) => {
  const { title, image, description, link, patients, details } = req.body;
  try {
    const newService = new Service({
      title,
      image,
      description,
      link,
      patients,
      details,
    });
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(500).json({ message: 'Error creating service', error });
  }
};

// Update a service
const updateService = async (req, res) => {
  const { id } = req.params;
  const { title, image, description, link, patients, details } = req.body;
  try {
    const updatedService = await Service.findByIdAndUpdate(
      id,
      { title, image, description, link, patients, details },
      { new: true }
    );
    res.json(updatedService);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error });
  }
};

// Delete a service
const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    await Service.findByIdAndDelete(id);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error });
  }
};


// Export the controller function(s)
module.exports = {
    getServices,
    getServiceById, // Export the new function
    createService,
    updateService,
    deleteService
  };
  