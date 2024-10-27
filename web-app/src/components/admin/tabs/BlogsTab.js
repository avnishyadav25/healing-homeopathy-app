// /src/components/admin/tabs/BlogsTab.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const BlogsTab = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(apiUrl+'/blogs')
      .then(response => setBlogs(response.data))
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Blogs</Typography>
      {blogs.map((blog) => (
        <Paper key={blog._id} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">{blog.title}</Typography>
          <Typography>{blog.author}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default BlogsTab;
