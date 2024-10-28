// src/components/admin/blog/EditBlog.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import BlogForm from './BlogForm';
import blogService from '../../../services/blogService';

const EditBlog = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(''); // State for feedback message

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
      await blogService.createOrUpdateBlog(data, id);
      setFeedbackMessage('Blog updated successfully!'); // Set success message
      setTimeout(() => setFeedbackMessage(''), 3000); // Clear the message after 3 seconds
    } catch (error) {
      console.error('Error updating blog:', error);
      setFeedbackMessage('Failed to update the blog'); // Set error message
      setTimeout(() => setFeedbackMessage(''), 3000);
    }
  };

  const handlePreview = () => {
    sessionStorage.setItem('previewBlog', JSON.stringify(blogData));
    window.open('/admin/blog/preview', '_blank');
  };

  return (
    <>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4">Edit Blog</Typography>
        {feedbackMessage && <Typography color="secondary" mt={1}>{feedbackMessage}</Typography>}
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
    </>
  );
};

export default EditBlog;
