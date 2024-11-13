// web-app/src/components/Ads.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const Ads = () => {
  return (
    <Box sx={{ mb: 2 }}>
      {/*<Typography variant="h6" sx={{ mb: 1 }}>Advertisement</Typography> */}
      <Box sx={{ width: '100%', height: 100, backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body2">Ad Space</Typography>
      </Box>
    </Box>
  );
};

export default Ads;