// /src/services/commentService.js
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchCommentsWithPostInfo = async () => {
  try {
    const response = await axios.get(`${apiUrl}/comments/withPostInfo`);
    console.log('### service comment response.data', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments with post info:', error);
    throw error;
  }
};

export const fetchCommentsByPostId = async (postId) => {
  try {
    const response = await axios.get(`${apiUrl}/comments/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const fetchCommentById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/comments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comment:', error);
    throw error;
  }
};

export const createComment = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/comments`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

export const updateComment = async (id, data) => {
  try {
    const response = await axios.put(`${apiUrl}/comments/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

export const deleteComment = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/comments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

export const updateCommentStatus = async (id, status) => {
  try {
    const response = await axios.put(`${apiUrl}/comments/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating comment status:', error);
    throw error;
  }
};

export const likeComment = async (id) => {
  try {
    const response = await axios.put(`${apiUrl}/comments/${id}/like`);
    return response.data;
  } catch (error) {
    console.error('Error liking comment:', error);
    throw error;
  }
}
