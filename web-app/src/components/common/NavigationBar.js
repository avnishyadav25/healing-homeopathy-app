// src/components/NavigationBar.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Button, Container, Typography, MenuItem, Drawer, Divider, Avatar, IconButton, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ToggleColorMode from '../ToggleColorMode';
import logo from '../../assets/logo.svg'; // Ensure this path is correct

const logoStyle = {
  width: '140px',
  height: '140px',
  cursor: 'pointer',
};

function NavigationBar({ mode, toggleColorMode }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
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

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              {logo ? (
                <img
                  src={logo}
                  style={logoStyle}
                  alt="Healing Homoeopathy Logo"
                  onClick={handleLogoClick}
                />
              ) : (
                <Typography
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ cursor: 'pointer' }}
                  onClick={handleLogoClick}
                >
                  Healing Homeopathy
                </Typography>
              )}
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem component={Link} to="/about">About</MenuItem>
                <MenuItem component={Link} to="/services">Services</MenuItem>
                <MenuItem component={Link} to="/blogs">Blogs</MenuItem>
                <MenuItem component={Link} to="/contact">Contact</MenuItem>
                <MenuItem component={Link} to="/order-medicine">Order Medicine</MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              {isLoggedIn ? (
                <>
                  <IconButton onClick={handleMenuClick} color="inherit">
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => navigate('/profile')}>My Profile</MenuItem>
                    {userRole === 'Admin' || userRole === 'Super Admin' ? (
                      <MenuItem onClick={() => navigate('/admin')}>Admin Dashboard</MenuItem>
                    ) : null}
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button color="primary" variant="text" size="small" component={Link} to="/login">
                    Login
                  </Button>
                  <Button color="primary" variant="contained" size="small" component={Link} to="/register">
                    Register
                  </Button>
                </>
              )}
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ minWidth: '60dvw', p: 2, backgroundColor: 'background.paper', flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', flexGrow: 1 }}>
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  <MenuItem component={Link} to="/about">About</MenuItem>
                  <MenuItem component={Link} to="/services">Services</MenuItem>
                  <MenuItem component={Link} to="/blogs">Blogs</MenuItem>
                  <MenuItem component={Link} to="/contact">Contact</MenuItem>
                  <MenuItem component={Link} to="/order-medicine">Order Medicine</MenuItem>
                  <Divider />
                  {isLoggedIn ? (
                    <>
                      <MenuItem onClick={() => navigate('/profile')}>My Profile</MenuItem>
                      {userRole === 'Admin' || userRole === 'Super Admin' ? (
                        <MenuItem onClick={() => navigate('/admin')}>Admin Dashboard</MenuItem>
                      ) : null}
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem component={Link} to="/login">
                        Login
                      </MenuItem>
                      <MenuItem component={Link} to="/register">
                        Register
                      </MenuItem>
                    </>
                  )}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

NavigationBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default NavigationBar;
