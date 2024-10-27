// /src/components/admin/tabs/UsersTab.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const UsersTab = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(apiUrl+'/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Users</Typography>
      {users.map((user) => (
        <Paper key={user._id} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">{user.name}</Typography>
          <Typography>{user.email}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default UsersTab;
