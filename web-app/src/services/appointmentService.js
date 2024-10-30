// /src/services/appointmentService.js
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchAppointments = async () => {
  try {
    const response = await axios.get(`${apiUrl}/appointments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

export const fetchAppointmentById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/appointments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointment by ID:', error);
    throw error;
  }
};

export const updateAppointmentStatus = async (id, status) => {
  try {
    const response = await axios.put(`${apiUrl}/appointments/status/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
};

export const deleteAppointment = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/appointments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};

export const updateAppointment = async (id, updatedData) => {
  try {
    const response = await axios.put(`${apiUrl}/appointments/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw error;
  }
};
