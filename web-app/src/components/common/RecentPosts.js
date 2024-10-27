// web-app/src/components/RecentPosts.js
import React from 'react';
import { Typography } from '@mui/material';

const RecentPosts = () => {
  // Example recent posts data
  const recentPosts = [
    { title: 'Post 1', id: '1' },
    { title: 'Post 2', id: '2' },
    { title: 'Post 3', id: '3' },
  ];

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 1 }}>Recent Posts</Typography>
      {recentPosts.map((post, index) => (
        <Typography key={index} variant="body2">
          {post.title}
        </Typography>
      ))}
    </div>
  );
};

export default RecentPosts;