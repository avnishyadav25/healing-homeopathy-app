// /web-app/src/services/blogService.js
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const fetchLatestBlogs = async (limit = 4) => {
  try {
    const response = await axios.get(`${apiUrl}/blogs?limit=${limit}`);
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

const fetchBlogByIdOrPermalink = async (identifier) => {
  try {
    const response = await axios.get(`${apiUrl}/blogs/${identifier}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog with identifier ${identifier}:`, error);
    throw new Error('Error fetching the blog post');
  }
};

const createOrUpdateBlog = async (blogData, id = null) => {
  try {
    const url = id ? `${apiUrl}/blogs/create-or-update/${id}` : `${apiUrl}/blogs/create`;
    const formData = new FormData();
    Object.keys(blogData).forEach((key) => formData.append(key, blogData[key]));
    const response = await axios.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log('#### response.data = ', response.data);
    return response.data;
  } catch (error) {
    console.log('#### error = ', error);
    console.error(`Error ${id ? 'updating' : 'creating'} blog:`, error);
    throw new Error(`Error ${id ? 'updating' : 'creating'} blog`); 
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
  fetchBlogByIdOrPermalink,
  createOrUpdateBlog,
  deleteBlog,
  archiveBlog,
};
