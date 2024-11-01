// /web-app/src/services/blogService.js
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const fetchLatestBlogs = async (limit = 4) => {
  try {
    const response = await axios.get(`${apiUrl}/blogs`, { params: { limit } });
    return response.data.blogs;
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
    throw new Error('Error fetching latest blogs');
  }
};


const fetchBlogs = async ({ status = '', page = 1, limit = 10 }) => {
  try {
    const response = await axios.get(`${apiUrl}/blogs`, { params: { status, page, limit } });
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw new Error('Error fetching blogs');
  }
};


// Fetch blogs by category
 const fetchBlogsByCategory = async (category, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${apiUrl}/blogs`, { params: { category, page, limit } });
    return response.data.blogs;
  } catch (error) {
    console.error(`Error fetching blogs for category ${category}:`, error);
    throw new Error('Error fetching blogs by category');
  }
};

const fetchBlogByIdOrPermalink = async (identifier) => {
  try {
    const response = await axios.get(`${apiUrl}/blogs/${identifier}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog with identifier ${identifier}:`, error);
    throw new Error('Error fetching the blog post');
  }
};

const createBlog = async (blogData) => {
  try {
    const formData = new FormData();

    const response = await axios.post(`${apiUrl}/blogs/create`, blogData);
    return response.data;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw new Error('Error creating blog');
  }
};

const updateBlog = async (id, blogData) => {
  try {
    console.log('#### id updateBlog = ', id);
    const formData = new FormData();
    console.log('#### formData = ', JSON.stringify(blogData));
    const response = await axios.put(`${apiUrl}/blogs/update/${id}`, blogData);
    return response.data;
  } catch (error) {
    console.error(`Error updating blog with ID ${id}:`, error);
    throw new Error('Error updating blog');
  }
};

const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/blogs/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting blog with ID ${id}:`, error);
    throw new Error('Error deleting blog');
  }
};

const archiveBlog = async (id) => {
  try {
    const response = await axios.patch(`${apiUrl}/blogs/archive/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error archiving blog with ID ${id}:`, error);
    throw new Error('Error archiving blog');
  }
};

export default {
  fetchLatestBlogs,
  fetchBlogs,
  fetchBlogsByCategory,
  fetchBlogByIdOrPermalink,
  createBlog,
  updateBlog,
  deleteBlog,
  archiveBlog,
};
