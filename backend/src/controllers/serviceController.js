// /backend/controllers/serviceController.js
const Service = require('../models/Service');

// Get all services
const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error });
  }
};

// Get a single service by ID
const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findById(id);
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
  const { title, shortDescription, description, link, patients, details, duration, cost, status, image } = req.body;
  
  try {
    const newService = new Service({
      title,
      shortDescription,
      description,
      link,
      patients,
      details,
      duration,
      cost,
      status,
      image, // Save image URL directly
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
  const { title, shortDescription, description, link, patients, details, duration, cost, status, image } = req.body;

  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    service.title = title || service.title;
    service.shortDescription = shortDescription || service.shortDescription;
    service.description = description || service.description;
    service.link = link || service.link;
    service.patients = patients || service.patients;
    service.details = details || service.details;
    service.duration = duration || service.duration;
    service.cost = cost || service.cost;
    service.status = status || service.status;
    service.image = image || service.image; // Update image URL if provided
    service.updatedAt = Date.now();

    await service.save();
    res.status(200).json({ message: 'Service updated successfully', service });
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error });
  }
};

// Delete a service
const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await service.remove();
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error });
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
