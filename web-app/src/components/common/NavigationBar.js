// src/components/NavigationBar.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Container,
  Typography,
  MenuItem,
  Drawer,
  Divider,
  IconButton,
  Menu,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ToggleColorMode from '../public/common/ToggleColorMode';
import logo from '../../assets/logo.svg';

const logoStyle = {
  width: '140px',
  height: '140px',
  cursor: 'pointer',
};

function NavigationBar({ mode, toggleColorMode }) {
  const [open, setOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);
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

  const toggleNavDrawer = (newOpen) => () => {
    setNavDrawerOpen(newOpen);
  };
  const toggleUserDrawer = (newOpen) => () => {
    setUserDrawerOpen(newOpen);
  };

  const navTextColor = mode === 'light' ? 'black' : 'white';

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
        <Container maxWidth="false">
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
            {/* Left Hamburger Menu for General Navigation in Mobile View */}
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={toggleNavDrawer(true)}
              sx={{ display: { xs: 'block', md: 'none' }, color: navTextColor, mr: 1 }}
            >
              <MenuIcon />
            </IconButton>

            <Drawer anchor="left" open={navDrawerOpen} onClose={toggleNavDrawer(false)}>
              <Box sx={{ p: 2, minWidth: '60vw' }}>
                <MenuItem component={Link} to="/" onClick={toggleNavDrawer(false)}>Home</MenuItem>
                <MenuItem component={Link} to="/about" onClick={toggleNavDrawer(false)}>About</MenuItem>
                <MenuItem component={Link} to="/services" onClick={toggleNavDrawer(false)}>Services</MenuItem>
                <MenuItem component={Link} to="/blogs" onClick={toggleNavDrawer(false)}>Blogs</MenuItem>
                <MenuItem component={Link} to="/discussions" onClick={toggleNavDrawer(false)}>Discussions</MenuItem>
                <MenuItem component={Link} to="/products" onClick={toggleNavDrawer(false)}>Products</MenuItem>
                <MenuItem component={Link} to="/contact" onClick={toggleNavDrawer(false)}>Contact</MenuItem>
                <MenuItem component={Link} to="/order-medicine" onClick={toggleNavDrawer(false)}>Order Medicine</MenuItem>
              </Box>
            </Drawer>

            {/* Logo */}
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
                  noWrap
                  sx={{ cursor: 'pointer', color: navTextColor }}
                  onClick={handleLogoClick}
                >
                  Healing Homoeopathy
                </Typography>
              )}
              {/* Desktop Navigation Links */}
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem component={Link} to="/">
                  <Typography color={navTextColor}>Home</Typography>
                </MenuItem>
                <MenuItem component={Link} to="/about">
                  <Typography color={navTextColor}>About</Typography>
                </MenuItem>
                <MenuItem component={Link} to="/services">
                  <Typography color={navTextColor}>Services</Typography>
                </MenuItem>
                <MenuItem component={Link} to="/blogs">
                  <Typography color={navTextColor}>Blogs</Typography>
                </MenuItem>
                <MenuItem component={Link} to="/forum">
                  <Typography color={navTextColor}>Forum</Typography>
                </MenuItem>
                <MenuItem component={Link} to="/products">
                  <Typography color={navTextColor}>Products</Typography>
                </MenuItem>
                <MenuItem component={Link} to="/contact">
                  <Typography color={navTextColor}>Contact</Typography>
                </MenuItem>
                <MenuItem component={Link} to="/order-medicine">
                  <Typography color={navTextColor}>Order Medicine</Typography>
                </MenuItem>
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
                  <IconButton onClick={handleMenuClick} sx={{ color: navTextColor }}>
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    sx={{
                      '& .MuiPaper-root': {
                        backgroundColor:
                          mode === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(10px)',
                        color: navTextColor,
                      },
                    }}
                  >
                    <MenuItem onClick={() => navigate('/my-profile')}>My Profile</MenuItem>
                    <MenuItem onClick={() => navigate('/my-blogs')}>My Blogs</MenuItem>
                    <MenuItem onClick={() => navigate('/my-discussions')}>My Discussions</MenuItem>
                    <MenuItem onClick={() => navigate('/my-appointments')}>My Appointments</MenuItem>
                    <MenuItem onClick={() => navigate('/my-rewards')}>My Rewards</MenuItem>
                    <Divider />
                    {userRole === 'Admin' || userRole === 'Super Admin' ? (
                      <MenuItem onClick={() => navigate('/admin')}>Admin Dashboard</MenuItem>
                    ) : null}
                    <MenuItem onClick={() => navigate('/my-settings')}>My Settings</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    color="inherit"
                    variant="text"
                    size="small"
                    component={Link}
                    to="/login"
                    sx={{ color: navTextColor }}
                  >
                    Login
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    component={Link}
                    to="/register"
                  >
                    Register
                  </Button>
                </>
              )}
            </Box>

            {/* Right Hamburger Menu for User Options and Dark Mode in Mobile View */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <IconButton
                color="inherit"
                aria-label="user-menu"
                onClick={toggleUserDrawer(true)}
                sx={{ color: navTextColor }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={userDrawerOpen} onClose={toggleUserDrawer(false)}>
                <Box sx={{ p: 2, minWidth: '60vw' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  {isLoggedIn ? (
                    <>
                      <MenuItem component={Link} to="/my-profile" onClick={toggleUserDrawer(false)}>
                        My Profile
                      </MenuItem>
                      <MenuItem component={Link} to="/my-blogs" onClick={toggleUserDrawer(false)}>
                        My Blogs
                      </MenuItem>
                      <MenuItem
                        component={Link}
                        to="/my-discussions"
                        onClick={toggleUserDrawer(false)}
                      >
                        My Discussions
                      </MenuItem>
                      <MenuItem
                        component={Link}
                        to="/my-appointments"
                        onClick={toggleUserDrawer(false)}
                      >
                        My Appointments
                      </MenuItem>
                      <MenuItem component={Link} to="/my-rewards" onClick={toggleUserDrawer(false)}>
                        My Rewards
                      </MenuItem>
                      <Divider />
                      {userRole === 'Admin' || userRole === 'Super Admin' ? (
                        <MenuItem component={Link} to="/admin" onClick={toggleUserDrawer(false)}>
                          Admin Dashboard
                        </MenuItem>
                      ) : null}
                      <MenuItem component={Link} to="/my-settings" onClick={toggleUserDrawer(false)}>
                        My Settings
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem component={Link} to="/login" onClick={toggleUserDrawer(false)}>
                        Login
                      </MenuItem>
                      <MenuItem component={Link} to="/register" onClick={toggleUserDrawer(false)}>
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
