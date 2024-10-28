// /src/components/admin/SideNavBar.js
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, Box, IconButton, Divider } from '@mui/material';
import { ExpandLess, ExpandMore, Menu } from '@mui/icons-material';
import { Home, Dashboard, Edit, Forum, LocalShipping, AccountCircle, AddBox } from '@mui/icons-material';
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

        <ListItem button onClick={() => handleClick('dashboard')}>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Dashboard" />}
          {open.dashboard && !collapsed && <ExpandLess />}
          {!open.dashboard && !collapsed && <ExpandMore />}
        </ListItem>
        <Collapse in={open.dashboard && !collapsed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button>
              <ListItemText inset primary="Overview" />
            </ListItem>
            <ListItem button>
              <ListItemText inset primary="Weekly" />
            </ListItem>
            <ListItem button>
              <ListItemText inset primary="Monthly" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => handleClick('blog')}>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Blog" />}
          {open.blog && !collapsed && <ExpandLess />}
          {!open.blog && !collapsed && <ExpandMore />}
        </ListItem>
        <Collapse in={open.blog && !collapsed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/admin/blog/all-blogs">
              <ListItemText inset primary="All Blogs" />
            </ListItem>
            <ListItem button component={Link} to="/admin/blog/create-blog">
              <ListItemText inset primary="Create Blog" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => handleClick('forum')}>
          <ListItemIcon>
            <Forum />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Forum" />}
          {open.forum && !collapsed && <ExpandLess />}
          {!open.forum && !collapsed && <ExpandMore />}
        </ListItem>
        <Collapse in={open.forum && !collapsed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button>
              <ListItemText inset primary="All Forums" />
            </ListItem>
            <ListItem button>
              <ListItemText inset primary="Create New Forum" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => handleClick('order')}>
          <ListItemIcon>
            <LocalShipping />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Order Management" />}
          {open.order && !collapsed && <ExpandLess />}
          {!open.order && !collapsed && <ExpandMore />}
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

        <ListItem button onClick={() => handleClick('account')}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Account" />}
          {open.account && !collapsed && <ExpandLess />}
          {!open.account && !collapsed && <ExpandMore />}
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

        <ListItem button onClick={() => handleClick('adminTools')}>
          <ListItemIcon>
            <AddBox />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Admin Tools" />}
          {open.adminTools && !collapsed && <ExpandLess />}
          {!open.adminTools && !collapsed && <ExpandMore />}
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
      </List>
    </Drawer>
  );
};

export default SideNavBar;
