// src/pages/BlogPreviewPage.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import BlogPostDetail from '../../../components/BlogPostDetail';

const BlogPreviewPage = () => {
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    const previewBlog = sessionStorage.getItem('previewBlog');
    if (previewBlog) {
      setBlogData(JSON.parse(previewBlog));
    }
  }, []);

  if (!blogData) return <Typography>Loading preview...</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <BlogPostDetail post={blogData} />
    </Container>
  );
};

export default BlogPreviewPage;
