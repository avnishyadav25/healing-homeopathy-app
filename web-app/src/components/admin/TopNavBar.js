// /src/components/admin/TopNavBar.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Badge,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';

const TopNavBar = ({ onMenuClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsEl, setNotificationsEl] = useState(null);
  const [addEl, setAddEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const name = localStorage.getItem('name') || sessionStorage.getItem('name');
    const role = localStorage.getItem('role') || sessionStorage.getItem('role');

    if (token) {
      setIsLoggedIn(true);
      setUserName(name);
      setUserRole(role);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleNotificationsClick = (event) => setNotificationsEl(event.currentTarget);

  const handleNotificationsClose = () => setNotificationsEl(null);

  const handleAddClick = (event) => setAddEl(event.currentTarget);

  const handleAddClose = () => setAddEl(null);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>

        {/* Go to Website Button */}
        <Button
          color="inherit"
          startIcon={<HomeIcon />}
          href="/" // Link to the website's homepage
          sx={{ mr: 2 }}
        >
          Go to Website
        </Button>

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
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(addEl)}
          onClose={handleAddClose}
        >
          <MenuItem onClick={handleAddClose} component="a" href="/admin/product/add-product">
            Add Product
          </MenuItem>
          <MenuItem onClick={handleAddClose} component="a" href="/admin/blogs/create">
            Add Blog
          </MenuItem>
          <MenuItem onClick={handleAddClose} component="a" href="/admin/user/add-user">
            Add User
          </MenuItem>
          <MenuItem onClick={handleAddClose} component="a" href="/admin/appointment/add-appointment">
            Add Appointment User
          </MenuItem>
          <MenuItem onClick={handleAddClose} component="a" href="/admin/newsletter/add-newsletter-user">
            Add Newsletter User
          </MenuItem>
          <MenuItem onClick={handleAddClose} component="a" href="/admin/appointment/add-appointment-template">
            Add Appointment Template
          </MenuItem>
          <MenuItem onClick={handleAddClose} component="a" href="/admin/newsletter/add-newsletter-template">
            Add Newsletter Template
          </MenuItem>
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
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(notificationsEl)}
          onClose={handleNotificationsClose}
        >
          <MenuItem onClick={handleNotificationsClose}>Notification 1</MenuItem>
          <MenuItem onClick={handleNotificationsClose}>Notification 2</MenuItem>
          <MenuItem onClick={handleNotificationsClose}>Notification 3</MenuItem>
          <MenuItem onClick={handleNotificationsClose}>Notification 4</MenuItem>
        </Menu>

        {/* Profile Icon */}
        {isLoggedIn ? (
          <>
            <Typography variant="body1" sx={{ mr: 2 }}>
              {userName}
            </Typography>
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
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => navigate('/profile')}>My Profile</MenuItem>
              {userRole === 'Admin' || userRole === 'Super Admin' ? (
                <MenuItem onClick={() => navigate('/admin')}>Admin Dashboard</MenuItem>
              ) : null}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <MenuItem component="a" href="/login">
            Login
          </MenuItem>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;
