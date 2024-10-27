// /src/components/common/NewsletterForm.js

import React, { useState } from 'react';
import { Box, TextField, Alert, Fade } from '@mui/material';
import axios from 'axios';
import Button from './Button';  // Import your custom Button component
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';  // Import the bell icon

const NewsletterForm = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/newsletter/subscribe`, { email });
      setSuccess(response.data.message || 'You have successfully subscribed!');
      setEmail('');
      if (onSuccess) onSuccess();  // Callback to parent component if needed
    } catch (error) {
      setError('Failed to subscribe. Please try again later.');
    }
  };

  return (
    <Fade in timeout={2000}>
      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <TextField
          type="email"
          label="Enter your email address"
          variant="outlined"
          fullWidth
          size="large"
          sx={{ mb: 3, transition: 'all 0.3s ease-in-out' }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button
          type="submit"
          sx={{
            mt: 1,
            backgroundColor: '#FF6F00',  // Change to your desired color
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: '#E65100',  // Darker shade on hover
              transform: 'scale(1.05)',
            },
          }}
        >
          <NotificationsActiveIcon sx={{ mr: 1 }} />  {/* Bell icon with some right margin */}
          Subscribe
        </Button>
      </Box>
    </Fade>
  );
};

export default NewsletterForm;
