// /src/components/admin/SideNavBar.js
import React, { useState } from 'react';
import {
  Drawer,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider,
  Typography,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Menu as MenuIcon,
  Home,
  Dashboard,
  Edit,
  Forum,
  LocalShipping,
  AccountCircle,
  AddBox,
  Business,
  CalendarToday,
  Comment,
  Build,
  People,
  Label,
  Category,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const Toggler = ({ defaultExpanded = false, renderToggle, children }) => {
  const [open, setOpen] = useState(defaultExpanded);
  return (
    <>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          transition: '0.2s ease',
          gridTemplateRows: open ? '1fr' : '0fr',
          '& > *': { overflow: 'hidden' },
        }}
      >
        {children}
      </Box>
    </>
  );
};

const SideNavBar = ({ isOpen, toggleDrawer }) => {
  const [open, setOpen] = useState({});
  const [collapsed, setCollapsed] = useState(true);

  const handleClick = (menu) => {
    setOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: { xs: collapsed ? 0 : drawerWidth, md: collapsed ? collapsedDrawerWidth : drawerWidth },
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: { xs: collapsed ? 0 : drawerWidth, md: collapsed ? collapsedDrawerWidth : drawerWidth },
          boxSizing: 'border-box',
          marginTop: '80px',
          transition: 'width 0.3s',
        },
        display: { xs: collapsed ? 'none' : 'block', md: 'block' },
      }}
    >
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <IconButton onClick={toggleCollapse}>
          <MenuIcon />
        </IconButton>
        {!collapsed && (
          <Typography variant="h6" component="div" sx={{ ml: 2 }}>
            Admin Panel
          </Typography>
        )}
      </Box>
      <Divider />
      <List component="nav">
        <ListItem button component={Link} to="/admin">
          <Home />
          {!collapsed && <ListItemText primary="Home" />}
        </ListItem>

        <ListItem button component={Link} to="/admin/users">
          <People />
          {!collapsed && <ListItemText primary="User Management" />}
        </ListItem>

        <ListItem button component={Link} to="/admin/blogs">
          <Edit />
          {!collapsed && <ListItemText primary="Blogs" />}
        </ListItem>

        <ListItem button component={Link} to="/admin/appointments">
          <CalendarToday />
          {!collapsed && <ListItemText primary="Appointments" />}
        </ListItem>

        <ListItem button component={Link} to="/admin/comments">
          <Comment />
          {!collapsed && <ListItemText primary="Comments" />}
        </ListItem>

        <ListItem button component={Link} to="/admin/forum">
          <Forum />
          {!collapsed && <ListItemText primary="Forum" />}
        </ListItem>

        <ListItem button component={Link} to="/admin/dashboard">
          <Dashboard />
          {!collapsed && <ListItemText primary="Dashboard" />}
        </ListItem>

        <ListItem button component={Link} to="/admin/services">
          <Build />
          {!collapsed && <ListItemText primary="Services" />}
        </ListItem>

        <ListItem button component={Link} to="/admin/tags">
          <Label />
          {!collapsed && <ListItemText primary="Tags" />}
        </ListItem>

        <ListItem button component={Link} to="/admin/categories">
          <Category />
          {!collapsed && <ListItemText primary="Categories" />}
        </ListItem>

        <Toggler
          renderToggle={({ open, setOpen }) => (
            <ListItem button onClick={() => setOpen(!open)}>
              <LocalShipping />
              {!collapsed && <ListItemText primary="Order Management" />}
              {open && !collapsed ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          )}
        >
          <List component="div" disablePadding>
            <ListItem button>
              <ListItemText inset primary="Current Orders" />
            </ListItem>
            <ListItem button>
              <ListItemText inset primary="Order History" />
            </ListItem>
          </List>
        </Toggler>

        <Toggler
          renderToggle={({ open, setOpen }) => (
            <ListItem button onClick={() => setOpen(!open)}>
              <AccountCircle />
              {!collapsed && <ListItemText primary="Account" />}
              {open && !collapsed ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          )}
        >
          <List component="div" disablePadding>
            <ListItem button>
              <ListItemText inset primary="My Profile" />
            </ListItem>
            <ListItem button>
              <ListItemText inset primary="My Settings" />
            </ListItem>
            <ListItem button>
              <ListItemText inset primary="Logout" />
            </ListItem>
          </List>
        </Toggler>

        <Toggler
          renderToggle={({ open, setOpen }) => (
            <ListItem button onClick={() => setOpen(!open)}>
              <AddBox />
              {!collapsed && <ListItemText primary="Admin Tools" />}
              {open && !collapsed ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          )}
        >
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/admin/product/add-product">
              <ListItemText inset primary="Add Product" />
            </ListItem>
            <ListItem button component={Link} to="/admin/user/add-user">
              <ListItemText inset primary="Add User" />
            </ListItem>
            <ListItem button component={Link} to="/admin/appointment/add-appointment">
              <ListItemText inset primary="Add Appointment" />
            </ListItem>
            <ListItem button component={Link} to="/admin/newsletter/add-newsletter-user">
              <ListItemText inset primary="Add Newsletter User" />
            </ListItem>
          </List>
        </Toggler>

        <ListItem button component={Link} to="/admin/company">
          <Business />
          {!collapsed && <ListItemText primary="Company Settings" />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideNavBar;
