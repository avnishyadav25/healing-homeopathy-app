// src/components/NavigationBar.js

import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from '../ToggleColorMode';
import logo from '../../assets/logo.svg'; // Ensure this path is correct

const logoStyle = {
  width: '140px',
  height: '140px',
  cursor: 'pointer',
};

function NavigationBar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate(); // Use the useNavigate hook for programmatic navigation

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogoClick = () => {
    navigate('/'); // Navigate to the home page
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
                  onClick={handleLogoClick} // Use the handleLogoClick function
                />
              ) : (
                <Typography
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ cursor: 'pointer' }}
                  onClick={handleLogoClick} // Use the handleLogoClick function
                >
                  Healing Homeopathy
                </Typography>
              )}
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem
                  component={Link}
                  to="/about"
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    About
                  </Typography>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/services"
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Services
                  </Typography>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/blogs"
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Blogs
                  </Typography>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/contact"
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Contact
                  </Typography>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/order-medicine"
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Order Medicine
                  </Typography>
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
              <Button
                color="primary"
                variant="text"
                size="small"
                component={Link}
                to="/login"
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
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  <MenuItem component={Link} to="/about">
                    About
                  </MenuItem>
                  <MenuItem component={Link} to="/services">
                    Services
                  </MenuItem>
                  <MenuItem component={Link} to="/blogs">
                    Blogs
                  </MenuItem>
                  <MenuItem component={Link} to="/contact">
                    Contact
                  </MenuItem>
                  <MenuItem component={Link} to="/order-medicine">
                    Order Medicine
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component={Link}
                      to="/register"
                      sx={{ width: '100%' }}
                    >
                      Register
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component={Link}
                      to="/login"
                      sx={{ width: '100%' }}
                    >
                      Login
                    </Button>
                  </MenuItem>
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
