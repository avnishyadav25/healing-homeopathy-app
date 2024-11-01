// src/components/admin/blog/CreateBlog.js
import React, { useState } from 'react';
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import BlogForm from './BlogForm';
import blogService from '../../../services/blogService';

const CreateBlog = () => {
  const [feedbackMessage, setFeedbackMessage] = useState(''); // State for feedback message
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = async (data) => {
    try {
      await blogService.createBlog(data);
      setFeedbackMessage('Blog created successfully!');
      setSnackbar({ open: true, message: 'Blog created successfully!', severity: 'success' });
      setTimeout(() => setFeedbackMessage(''), 3000);
    } catch (error) {
      console.error('Error creating blog:', error);
      setFeedbackMessage('Failed to create the blog');
      setSnackbar({ open: true, message: 'Failed to create the blog', severity: 'error' });
      setTimeout(() => setFeedbackMessage(''), 3000);
    }
  };

  const handlePreview = (data) => {
    sessionStorage.setItem('previewBlog', JSON.stringify(data));
    window.open('/admin/blog/preview', '_blank');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  return (
    <>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4">Create New Blog</Typography>
        {feedbackMessage && <Typography color="secondary" mt={1}>{feedbackMessage}</Typography>}
      </Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="outlined" color="primary" onClick={() => handlePreview()}>
          Preview
        </Button>
      </Box>
      <BlogForm onSubmit={handleSubmit} onSaveDraft={handleSubmit} onImageUpload={() => {}} />
      
      {/* Snackbar for success/error messages */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateBlog;
