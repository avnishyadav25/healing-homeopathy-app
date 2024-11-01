// src/components/admin/blog/EditBlog.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import BlogForm from './BlogForm';
import blogService from '../../../services/blogService';

const EditBlog = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await blogService.fetchBlogByIdOrPermalink(id);
        setBlogData(blog);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      console.log('### id = ', id);
      await blogService.updateBlog(id,data );
      setSnackbar({ open: true, message: 'Blog updated successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error updating blog:', error);
      setSnackbar({ open: true, message: 'Failed to update the blog', severity: 'error' });
    }
  };

  const handlePreview = () => {
    sessionStorage.setItem('previewBlog', JSON.stringify(blogData));
    window.open('/admin/blog/preview', '_blank');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  return (
    <>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4">Edit Blog</Typography>
      </Box>

      {blogData && (
        <>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button variant="outlined" color="primary" onClick={handlePreview}>
              Preview
            </Button>
          </Box>
          <BlogForm
            blogData={blogData}
            onSubmit={handleSubmit}
            onSaveDraft={handleSubmit}
            onImageUpload={() => {}}
          />
        </>
      )}

      {/* Snackbar for success/error messages */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditBlog;
