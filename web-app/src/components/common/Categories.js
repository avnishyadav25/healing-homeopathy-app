// web-app/src/components/Categories.js
import React from 'react';
import { Typography } from '@mui/material';

const Categories = ({ category }) => {
  return (
    <div>
      <Typography variant="h6" sx={{ mb: 1 }}>Category</Typography>
      <Typography variant="body2">{category}</Typography>
    </div>
  );
};

export default Categories;