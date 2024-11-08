// src/services/forumService.js
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// Helper to get the Authorization header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const postQuestions = async () => {
  try {
    const response = await axios.post(`${apiUrl}/forum/questions`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return []; // Return an empty array on error
  }
};


export const getQuestions = async () => {
  try {
    const response = await axios.get(`${apiUrl}/forum/questions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return []; // Return an empty array on error
  }
};

export const getQuestionDetails = async (questionId) => {
  try {
    const response = await axios.get(`${apiUrl}/forum/questions/${questionId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching question details for ID ${questionId}:`, error);
    return null; // Return null on error
  }
};

export const postReply = async (questionId, replyData) => { 
  try {
    console.log('### replyData ', replyData);
    const response = await axios.post(`${apiUrl}/forum/replies/${questionId}`, replyData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error posting reply for question ID ${questionId}:`, error);
    throw error; // Rethrow error to be handled in the component if necessary
  }
};

export const getPopularQuestions = async () => {
  try {
    const response = await axios.get(`${apiUrl}/forum/popular-questions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching popular questions:", error);
    throw error;
  }
};

export const getRecentQuestions = async () => {
  try {
    const response = await axios.get(`${apiUrl}/forum/recent-questions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recent questions:", error);
    throw error;
  }
};

export const getTags = async () => {
  try {
    const response = await axios.get(`${apiUrl}/forum/tags`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};

// Fetch categories with question count
export const getCategories = async () => {
  try {
    const response = await axios.get(`${apiUrl}/forum/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};



export const createOrUpdateCategories = async (categories) => {
  try {
    const response = await axios.post(`${apiUrl}/categories/createOrUpdate`, { categories });
    return response.data.categories;
  } catch (error) {
    console.error('Error in createOrUpdateCategories:', error);
    throw error;
  }
};

export const createOrUpdateTags = async (tags) => {
  try {
    const response = await axios.post(`${apiUrl}/tags/createOrUpdate`, { tags });
    return response.data.tags;
  } catch (error) {
    console.error('Error in createOrUpdateTags:', error);
    throw error;
  }
};

export const createQuestion = async (questionData) => {
  try {
    console.log('### questionData', questionData);
    const response = await axios.post(`${apiUrl}/forum/questions`, questionData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error in createQuestion:', error);
    throw error;
  }
};


export const getQuestionBySlug = async (questionId) => {
  try {
    const response = await axios.get(`${apiUrl}/forum/questions/${questionId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching question details for ID ${questionId}:`, error);
    return null; // Return null on error
  }
};

export const getRepliesByQuestionId = async (questionId) => {
  try {
    const response = await axios.get(`${apiUrl}/forum/replies/${questionId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching question details for ID ${questionId}:`, error);
    return null; // Return null on error
  }
};

// Fetch tags with question count
export const getTagsWithCount = async () => {
  try {
    const response = await axios.get(`${apiUrl}/forum/tags-with-count`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};

// Fetch categories with question count
export const getCategoriesWithCount = async () => {
  try {
    const response = await axios.get(`${apiUrl}/forum/categories-with-count`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};


