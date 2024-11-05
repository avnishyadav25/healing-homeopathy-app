// src/components/ComingSoon.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        padding: 4,
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        Coming Soon!
      </Typography>
      <Typography variant="h6" component="p" color="text.secondary" mb={4}>
        We're working hard to bring you exciting new content. Stay tuned!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ mt: 3 }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default ComingSoon;
