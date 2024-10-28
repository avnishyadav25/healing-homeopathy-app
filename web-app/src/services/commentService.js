// /web-app/src/services/commentService.js
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const fetchCommentsByPostId = async (postId) => {
  try {
    const response = await axios.get(`${apiUrl}/comments/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching comments');
  }
};

const createComment = async (commentData) => {
  try {
    const response = await axios.post(`${apiUrl}/comments`, commentData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating comment');
  }
};

export default {
  fetchCommentsByPostId,
  createComment,
};
