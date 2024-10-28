// src/components/admin/blog/BlogPreviewModal.js
import React from 'react';
import { Modal, Box } from '@mui/material';
import BlogPostDetail from '../../BlogPostDetail';

const BlogPreviewModal = ({ open, onClose, blogData }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, bgcolor: 'background.paper', maxWidth: '80%', margin: 'auto', mt: 4 }}>
        <BlogPostDetail post={blogData} />
      </Box>
    </Modal>
  );
};

export default BlogPreviewModal;
