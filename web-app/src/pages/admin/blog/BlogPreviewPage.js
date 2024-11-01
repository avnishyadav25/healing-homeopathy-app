// src/pages/BlogPreviewPage.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import BlogPostDetail from '../../../components/public/blog/BlogPostDetail';
import Template from '../../../components/common/Template';


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
    <Template>
      <BlogPostDetail post={blogData} />
   </Template>
  );
};

export default BlogPreviewPage;
