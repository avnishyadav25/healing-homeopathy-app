// web-app/src/components/Tags.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Tags = ({ tags }) => {
  return (
    <div>
      <Typography variant="h6" sx={{ mb: 1 }}>Tags</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {tags.map((tag, index) => (
          <Typography key={index} variant="body2" color="primary">
            {tag}
          </Typography>
        ))}
      </Box>
    </div>
  );
};

export default Tags;