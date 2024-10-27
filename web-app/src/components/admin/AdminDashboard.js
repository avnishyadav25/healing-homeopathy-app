// /src/components/admin/AdminDashboard.js
import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import AppointmentsTab from './tabs/AppointmentsTab';
import UsersTab from './tabs/UsersTab';
import ProductsTab from './tabs/ProductsTab';
import BlogsTab from './tabs/BlogsTab';
import CommentsTab from './tabs/CommentsTab';
import NewsletterUsersTab from './tabs/NewsletterUsersTab';
import ServicesTab from './tabs/ServicesTab';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return <AppointmentsTab />;
      case 1:
        return <UsersTab />;
      case 2:
        return <ProductsTab />;
      case 3:
        return <BlogsTab />;
      case 4:
        return <CommentsTab />;
      case 5:
        return <NewsletterUsersTab />;
      case 6:
        return <ServicesTab />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Tabs value={selectedTab} onChange={handleChange} aria-label="admin dashboard tabs">
        <Tab label="Appointments" />
        <Tab label="Users" />
        <Tab label="Products" />
        <Tab label="Blogs" />
        <Tab label="Comments" />
        <Tab label="Newsletter Users" />
        <Tab label="Services" />
      </Tabs>
      {renderTabContent()}
    </Box>
  );
};

export default AdminDashboard;
