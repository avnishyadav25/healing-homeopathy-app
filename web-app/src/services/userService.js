// src/services/userService.js

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Helper to get the Authorization header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching user by ID (${id}):`, error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, userData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating user by ID (${id}):`, error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting user by ID (${id}):`, error);
    throw error;
  }
};
