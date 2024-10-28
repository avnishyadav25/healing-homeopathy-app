// /src/components/admin/TopNavBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';

const TopNavBar = ({ onMenuClick, username }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationsEl, setNotificationsEl] = React.useState(null);
  const [addEl, setAddEl] = React.useState(null);

  // Handle profile menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle notifications menu
  const handleNotificationsClick = (event) => {
    setNotificationsEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsEl(null);
  };

  // Handle add menu
  const handleAddClick = (event) => {
    setAddEl(event.currentTarget);
  };

  const handleAddClose = () => {
    setAddEl(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>

        {/* Add Icon */}
        <IconButton
          edge="end"
          aria-label="add new items"
          aria-controls="add-menu"
          aria-haspopup="true"
          onClick={handleAddClick}
          color="inherit"
        >
          <AddIcon />
        </IconButton>
        <Menu
          id="add-menu"
          anchorEl={addEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(addEl)}
          onClose={handleAddClose}
        >
          <MenuItem onClick={handleAddClose} component="a" href="/admin/product/add-product">Add Product</MenuItem>
          <MenuItem onClick={handleAddClose} component="a" href="/admin/blog/create-blog">Add Blog</MenuItem>
          <MenuItem onClick={handleAddClose} component="a" href="/admin/user/add-user">Add User</MenuItem>
          <MenuItem onClick={handleAddClose} component="a" href="/admin/appointment/add-appointment">Add Appointment User</MenuItem>
          <MenuItem onClick={handleAddClose} component="a" href="/admin/newsletter/add-newsletter-user">Add Newsletter User</MenuItem>
          <MenuItem onClick={handleAddClose} component="a" href="/admin/appointment/add-appointment-template">Add Appointment Template</MenuItem>
          <MenuItem onClick={handleAddClose} component="a" href="/admin/newsletter/add-newsletter-template">Add Newsletter Template</MenuItem>
        </Menu>

        {/* Notifications Icon */}
        <IconButton
          edge="end"
          aria-label="notifications"
          aria-controls="notifications-menu"
          aria-haspopup="true"
          onClick={handleNotificationsClick}
          color="inherit"
        >
          <Badge badgeContent={4} color="error"> {/* Change 4 to the number of notifications */}
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Menu
          id="notifications-menu"
          anchorEl={notificationsEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(notificationsEl)}
          onClose={handleNotificationsClose}
        >
          <MenuItem onClick={handleNotificationsClose}>Notification 1</MenuItem>
          <MenuItem onClick={handleNotificationsClose}>Notification 2</MenuItem>
          <MenuItem onClick={handleNotificationsClose}>Notification 3</MenuItem>
          <MenuItem onClick={handleNotificationsClose}>Notification 4</MenuItem>
        </Menu>

        {/* Profile Icon */}
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>My Account</MenuItem>
          <MenuItem onClick={handleClose}>My Settings</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;
