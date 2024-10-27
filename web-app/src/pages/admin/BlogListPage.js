import React from 'react';
import AdminPageTemplate from '../../components/admin/AdminPageTemplate';
import { Typography, Paper, Tabs, Tab } from '@mui/material';

const BlogListPage = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <AdminPageTemplate>
      <Typography variant="h4" gutterBottom>
        All Blogs
      </Typography>
      <Paper>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="All Blogs" />
          <Tab label="Published Blogs" />
          <Tab label="Draft Blogs" />
          <Tab label="Scheduled Blogs" />
          <Tab label="Archive Blogs" />
        </Tabs>
        {/* Render the list of blogs based on the selected tab */}
      </Paper>
    </AdminPageTemplate>
  );
};

export default BlogListPage;
