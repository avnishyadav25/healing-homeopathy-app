// /src/services/tagService.js

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Get all tags with pagination
export const getAllTags = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/tags`, {
      params: { page, limit },
    });
    console.log('### response', response);
    return {
      data: response.data.tags,
      pages: response.data.pages,
    };
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};

// Get fetchTags with pagination
export const fetchTags = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/tags`, {
      params: { page, limit },
    });
    console.log('### response', response);
    return {
      data: response.data.tags,
      pages: response.data.pages,
    };
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};

// Get a single tag by ID
export const getTagById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/tags/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching tag with ID (${id}):`, error);
    throw error;
  }
};

// Create a new tag
export const createTag = async (tagData) => {
  try {
    console.log('#### tagData ', tagData);
    const response = await axios.post(`${API_URL}/tags`, tagData);
    return response.data;
  } catch (error) {
    console.error('Error creating tag:', error);
    throw error;
  }
};

// Update an existing tag by ID
export const updateTag = async (id, tagData) => {
  try {
    const response = await axios.put(`${API_URL}/tags/${id}`, tagData);
    return response.data;
  } catch (error) {
    console.error(`Error updating tag with ID (${id}):`, error);
    throw error;
  }
};

// Delete a tag by ID
export const deleteTag = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/tags/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting tag with ID (${id}):`, error); 
    throw error;
  }
};

export const createOrUpdateTags = async (tags) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/tags/createOrUpdate`, { tags });
    return response.data.tags; // Return the updated list of tags from the backend
  } catch (error) {
    console.error('Error in createOrUpdateTags:', error);
    throw error;
  }
};


