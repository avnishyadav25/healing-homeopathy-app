// /web-app/src/services/blogService.js
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const fetchLatestBlogs = async (limit = 4) => {
  try {
    const response = await axios.get(`${apiUrl}/blogs?limit=${limit}`);
    return response.data.blogs;
  } catch (error) {
    throw new Error('Error fetching blogs');
  }
};

const fetchBlogByIdOrPermalink = async (identifier) => {
  try {
    const response = await axios.get(`${apiUrl}/blogs/${identifier}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching the blog post');
  }
};

export default {
  fetchLatestBlogs,
  fetchBlogByIdOrPermalink,
};
