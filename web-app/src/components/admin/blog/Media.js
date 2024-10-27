import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const Media = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Media Library
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper>
            <img src="https://via.placeholder.com/150" alt="media" width="100%" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper>
            <img src="https://via.placeholder.com/150" alt="media" width="100%" />
          </Paper>
        </Grid>
        {/* Add more media items */}
      </Grid>
    </Box>
  );
};

export default Media;
