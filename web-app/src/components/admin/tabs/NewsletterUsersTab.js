// /src/components/admin/tabs/NewsletterUsersTab.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const NewsletterUsersTab = () => {
  const [newsletterUsers, setNewsletterUsers] = useState([]);

  useEffect(() => {
    axios.get(apiUrl+'/newsletter-users')
      .then(response => setNewsletterUsers(response.data))
      .catch(error => console.error('Error fetching newsletter users:', error));
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Newsletter Users</Typography>
      {newsletterUsers.map((user) => (
        <Paper key={user._id} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">{user.email}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default NewsletterUsersTab;
