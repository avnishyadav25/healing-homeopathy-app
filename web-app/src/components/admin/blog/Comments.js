import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Tabs, Tab, Paper } from '@mui/material';

const Comments = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Comments
      </Typography>
      <Paper>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="All Comments" />
          <Tab label="New Comments" />
          <Tab label="Archived Comments" />
        </Tabs>
        <List>
          {/* Render the comments based on the selected tab */}
          <ListItem>
            <ListItemText primary="Comment 1" secondary="Blog Title - User" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Comment 2" secondary="Blog Title - User" />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default Comments;
