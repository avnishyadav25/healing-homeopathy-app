// src/services/forumService.js
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

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
    const response = await axios.post(`${apiUrl}/forum/replies/${questionId}`, replyData);
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