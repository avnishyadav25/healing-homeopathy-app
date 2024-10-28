// src/components/admin/blog/CreateBlog.js
import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import BlogForm from './BlogForm';
import blogService from '../../../services/blogService';

const CreateBlog = () => {
  const [feedbackMessage, setFeedbackMessage] = useState(''); // State for feedback message

  const handleSubmit = async (data) => {
    try {
      await blogService.createOrUpdateBlog(data);
      setFeedbackMessage('Blog created successfully!'); // Set success message
      setTimeout(() => setFeedbackMessage(''), 3000); // Clear the message after 3 seconds
    } catch (error) {
      console.error('Error creating blog:', error);
      setFeedbackMessage('Failed to create the blog'); // Set error message
      setTimeout(() => setFeedbackMessage(''), 3000);
    }
  };

  const handlePreview = (data) => {
    sessionStorage.setItem('previewBlog', JSON.stringify(data));
    window.open('/admin/blog/preview', '_blank');
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
    </>
  );
};

export default CreateBlog;
