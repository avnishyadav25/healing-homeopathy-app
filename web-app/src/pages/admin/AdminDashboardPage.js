// /src/pages/admin/AdminDashboardPage.js
import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import SideNavBar from '../../components/admin/SideNavBar';
import TopNavBar from '../../components/admin/TopNavBar';
import AdminDashboard from '../../components/admin/AdminDashboard';
import AdminPageTemplate from '../../components/admin/AdminPageTemplate'; // Assuming you have a page template


const drawerWidth = 240;

const AdminDashboardPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


/*return (
  <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <TopNavBar onMenuClick={handleDrawerToggle} username="Admin" />
    <SideNavBar isOpen={mobileOpen} toggleDrawer={handleDrawerToggle} />
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { md: `calc(100% - ${drawerWidth}px)` },
        mt: 8,
      }}
    >
      <h1>Welcome to the Admin Dashboard</h1>
        <AdminDashboard />
    </Box>
  </Box>
);
};*/

return (
  <AdminPageTemplate>
      <h1>Welcome to the Admin Dashboard</h1>
        <AdminDashboard />
    </AdminPageTemplate>
);
};


export default AdminDashboardPage;
