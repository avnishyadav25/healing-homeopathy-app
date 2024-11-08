// /src/services/categoryService.js

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Get all categories with pagination
export const getAllCategories = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/categories`, {
      params: { page, limit },
    });
    return {
      data: response.data.categories,
      pages: response.data.totalPages, // Assuming the backend sends `totalPages`
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Fetch all categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data.categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Error fetching categories');
  }
};

export default {
  fetchCategories,
};

// Get a single category by ID
export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category with ID (${id}):`, error);
    throw error;
  }
};

// Create a new category
export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${API_URL}/categories`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

// Update an existing category by ID
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await axios.put(`${API_URL}/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error(`Error updating category with ID (${id}):`, error);
    throw error;
  }
};

// Delete a category by ID
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting category with ID (${id}):`, error);
    throw error;
  }
};

export const createOrUpdateCategories = async (categories) => {
  // Ensure categories is an array, even if a single category string is passed
  if (!Array.isArray(categories)) {
    categories = [categories];
  }

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/categories/createOrUpdate`, { categories });
    return response.data.categories; // Return the updated list of categories from the backend
  } catch (error) {
    console.error('Error in createOrUpdateCategories:', error);
    throw error;
  }
};





