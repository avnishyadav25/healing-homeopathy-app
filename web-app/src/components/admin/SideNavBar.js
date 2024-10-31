// /src/components/admin/SideNavBar.js
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, Box, IconButton, Divider } from '@mui/material';
import { ExpandLess, ExpandMore, Menu, Home, Dashboard, Edit, Forum, LocalShipping, AccountCircle, AddBox, Business, CalendarToday, Comment, Build, People, Label, Category  } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

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
        width: collapsed ? collapsedDrawerWidth : drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: collapsed ? collapsedDrawerWidth : drawerWidth,
          boxSizing: 'border-box',
          marginTop: '80px',
          transition: 'width 0.3s',
        },
      }}
    >
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <IconButton onClick={toggleCollapse}>
          <Menu />
        </IconButton>
      </Box>
      <Divider />
      <List component="nav">
        <ListItem button component={Link} to="/admin">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Home" />}
        </ListItem>
        {/* User Management Link */}
        <ListItem button component={Link} to="/admin/users">
          <ListItemIcon>
            <People />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="User Management" />}
        </ListItem>

        {/* Blog Link */}
        <ListItem button component={Link} to="/admin/blogs">
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Blogs" />}
        </ListItem>

        {/* Appointments Link */}
        <ListItem button component={Link} to="/admin/appointments">
          <ListItemIcon>
            <CalendarToday />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Appointments" />}
        </ListItem>

        {/* Comments Link */}
        <ListItem button component={Link} to="/admin/comments">
          <ListItemIcon>
            <Comment />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Comments" />}
        </ListItem>

        {/* Forum Link */}
        <ListItem button component={Link} to="/admin/forum">
          <ListItemIcon>
            <Forum />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Forum" />}
        </ListItem>

        {/* Dashboard Link */}
        <ListItem button component={Link} to="/admin/dashboard">
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Dashboard" />}
        </ListItem>

        {/* Services Link */}
        <ListItem button component={Link} to="/admin/services">
          <ListItemIcon>
            <Build />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Services" />}
        </ListItem>

        <ListItem button component={Link} to="/admin/tags">
          <ListItemIcon>
            <Label />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Tags" />}
        </ListItem>

        <ListItem button component={Link} to="/admin/categories">
          <ListItemIcon>
            <Category />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Categories" />}
        </ListItem>

        {/* Order Management */}
        <ListItem button onClick={() => handleClick('order')}>
          <ListItemIcon>
            <LocalShipping />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Order Management" />}
          {open.order && !collapsed ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open.order && !collapsed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button>
              <ListItemText inset primary="Current Orders" />
            </ListItem>
            <ListItem button>
              <ListItemText inset primary="Order History" />
            </ListItem>
          </List>
        </Collapse>

        {/* Account Settings */}
        <ListItem button onClick={() => handleClick('account')}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Account" />}
          {open.account && !collapsed ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open.account && !collapsed} timeout="auto" unmountOnExit>
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
        </Collapse>

        {/* Admin Tools */}
        <ListItem button onClick={() => handleClick('adminTools')}>
          <ListItemIcon>
            <AddBox />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Admin Tools" />}
          {open.adminTools && !collapsed ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open.adminTools && !collapsed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/admin/product/add-product">
              <ListItemText inset primary="Add Product" />
            </ListItem>
            <ListItem button component={Link} to="/admin/user/add-user">
              <ListItemText inset primary="Add User" />
            </ListItem>
            <ListItem button component={Link} to="/admin/appointment/add-appointment">
              <ListItemText inset primary="Add Appointment User" />
            </ListItem>
            <ListItem button component={Link} to="/admin/newsletter/add-newsletter-user">
              <ListItemText inset primary="Add Newsletter User" />
            </ListItem>
            <ListItem button component={Link} to="/admin/appointment/add-appointment-template">
              <ListItemText inset primary="Add Appointment Template" />
            </ListItem>
            <ListItem button component={Link} to="/admin/newsletter/add-newsletter-template">
              <ListItemText inset primary="Add Newsletter Template" />
            </ListItem>
          </List>
        </Collapse>

        {/* Company Settings */}
        <ListItem button component={Link} to="/admin/company">
          <ListItemIcon>
            <Business />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Company Settings" />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideNavBar;
