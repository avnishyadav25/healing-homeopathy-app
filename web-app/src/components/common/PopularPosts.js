// web-app/src/components/PopularPosts.js
import React from 'react';
import { Typography } from '@mui/material';

const PopularPosts = () => {
  // Example popular posts data
  const popularPosts = [
    { title: 'Popular Post 1', id: '1' },
    { title: 'Popular Post 2', id: '2' },
    { title: 'Popular Post 3', id: '3' },
  ];

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 1 }}>Popular Posts</Typography>
      {popularPosts.map((post, index) => (
        <Typography key={index} variant="body2">
          {post.title}
        </Typography>
      ))}
    </div>
  );
};

export default PopularPosts;