// /web-app/src/components/admin/CustomAppBar.js

import React from 'react';
import { AppBar, UserMenu, MenuItemLink, useTranslate } from 'react-admin';
import { Typography, Box, IconButton, Tooltip } from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  Notifications as NotificationsIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const CustomUserMenu = (props) => (
  <UserMenu {...props}>
    <MenuItemLink
      to="/admin-dashboard/account/profile"
      primaryText="My Profile"
      leftIcon={<AccountCircleIcon />}
    />
    <MenuItemLink
      to="/admin-dashboard/account/settings"
      primaryText="My Settings"
      leftIcon={<AccountCircleIcon />}
    />
    <MenuItemLink
      to="/admin-dashboard/account/logout"
      primaryText="Logout"
      leftIcon={<AccountCircleIcon />}
    />
  </UserMenu>
);

const CustomAppBar = (props) => {
  const translate = useTranslate();

  return (
    <AppBar {...props} userMenu={<CustomUserMenu />}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Admin Dashboard
      </Typography>
      <Box>
        <Tooltip title={translate('notifications')} placement="bottom">
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={translate('Add Content')} placement="bottom">
          <IconButton color="inherit" component={Link} to="/admin-dashboard/add-content">
            <AddIcon />
          </IconButton>
        </Tooltip>
        <IconButton color="inherit" aria-label="account">
          <AccountCircleIcon />
        </IconButton>
      </Box>
    </AppBar>
  );
};

export default CustomAppBar;
