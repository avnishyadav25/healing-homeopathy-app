// /src/services/serviceService.js
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// Fetch all services
export const fetchServices = async () => {
  try {
    const response = await axios.get(`${apiUrl}/services`);
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

// Fetch a single service by ID
export const fetchServiceById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/services/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching service with ID ${id}:`, error);
    throw error;
  }
};

// Create a new service
export const createService = async (serviceData) => {
  try {
    const response = await axios.post(`${apiUrl}/services`, serviceData);
    return response.data;
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

// Update an existing service
export const updateService = async (id, updatedData) => {
  try {
    const response = await axios.put(`${apiUrl}/services/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating service with ID ${id}:`, error);
    throw error;
  }
};

// Delete a service
export const deleteService = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/services/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting service with ID ${id}:`, error);
    throw error;
  }
};
