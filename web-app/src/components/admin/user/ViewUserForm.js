// /src/components/admin/users/ViewUserForm.js
import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const ViewUserForm = ({ user }) => (
  <Box p={3}>
    <Typography variant="h4" gutterBottom>{user.name}</Typography>
    {user.profilePhoto && <Avatar src={user.profilePhoto} alt={user.name} sx={{ width: 150, height: 150, mb: 2 }} />}
    <Typography variant="body1">Email: {user.email}</Typography>
    <Typography variant="body1">Role: {user.role}</Typography>
    <Typography variant="body1">About: {user.about}</Typography>
    {/* Display education, experience, and other information as needed */}
  </Box>
);

export default ViewUserForm;
