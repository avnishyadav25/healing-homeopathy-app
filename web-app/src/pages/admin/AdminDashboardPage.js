// /src/pages/admin/AdminDashboardPage.js

import React from 'react';
import { Box, Typography } from '@mui/material';
import AdminDashboard from '../../components/admin/AdminDashboard';
import AdminPageTemplate from '../../components/admin/AdminPageTemplate';

const AdminDashboardPage = () => {
  return (
    <AdminPageTemplate>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Admin Dashboard
        </Typography>
        <AdminDashboard />
      </Box>
    </AdminPageTemplate>
  );
};

export default AdminDashboardPage;
