//web-app/src/components/admin/AdminPageTemplate.js
import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import SideNavBar from './SideNavBar';
import TopNavBar from './TopNavBar';

const drawerWidth = 240;
const collapsedDrawerWidth = 0;

const AdminPageTemplate = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(true); // Collapsed by default

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopNavBar />
      <SideNavBar collapsed={collapsed} toggleCollapse={() => setCollapsed(!collapsed)} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8, // Adjust to avoid overlap with the top navbar
          width: `calc(100% - ${collapsed ? collapsedDrawerWidth : drawerWidth}px)`,
          ml: collapsed ? `${collapsedDrawerWidth}px` : `${drawerWidth}px`,
          transition: 'margin 0.3s ease-in-out',
        }}
      >
        <Container maxWidth="lg">
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default AdminPageTemplate;
