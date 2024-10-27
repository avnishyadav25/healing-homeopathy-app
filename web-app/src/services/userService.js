// src/services/userService.js

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};
