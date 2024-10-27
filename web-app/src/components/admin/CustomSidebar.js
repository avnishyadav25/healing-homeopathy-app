// /web-app/src/components/admin/CustomSidebar.js

import React from 'react';
import { useState } from 'react';
import {
  DashboardMenuItem,
  MenuItemLink,
  useSidebarState,
  useTranslate,
  Menu,
} from 'react-admin';
import { useNavigate } from 'react-router-dom';
import { List, Collapse } from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Dashboard as DashboardIcon,
  Edit as EditIcon,
  Forum as ForumIcon,
  LocalShipping as LocalShippingIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';

const CustomSidebar = (props) => {
  const [open, setOpen] = useState({});
  const [sidebarOpen] = useSidebarState();
  const navigate = useNavigate();

  const handleClick = (menu) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [menu]: !prevOpen[menu],
    }));
  };

  return (
    <Menu {...props}>
      <DashboardMenuItem />
      <MenuItemLink
        to="/dashboard"
        primaryText="Dashboard"
        leftIcon={<DashboardIcon />}
        onClick={() => navigate('/admin-dashboard')}
      />
      <MenuItemLink
        to="#"
        primaryText="Blog"
        leftIcon={<EditIcon />}
        onClick={() => handleClick('blog')}
      />
      <Collapse in={open.blog} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <MenuItemLink
            to="/admin-dashboard/blog/all-blogs"
            primaryText="All Blogs"
            onClick={() => navigate('/admin-dashboard/blog/all-blogs')}
          />
          <MenuItemLink
            to="/admin-dashboard/blog/create-blog"
            primaryText="Create Blog"
            onClick={() => navigate('/admin-dashboard/blog/create-blog')}
          />
          <MenuItemLink
            to="/admin-dashboard/blog/comments"
            primaryText="Comments"
            onClick={() => navigate('/admin-dashboard/blog/comments')}
          />
          <MenuItemLink
            to="/admin-dashboard/blog/media"
            primaryText="Media"
            onClick={() => navigate('/admin-dashboard/blog/media')}
          />
        </List>
      </Collapse>
      <MenuItemLink
        to="#"
        primaryText="Forum"
        leftIcon={<ForumIcon />}
        onClick={() => handleClick('forum')}
      />
      <Collapse in={open.forum} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <MenuItemLink
            to="/admin-dashboard/forum/all-forums"
            primaryText="All Forums"
            onClick={() => navigate('/admin-dashboard/forum/all-forums')}
          />
          <MenuItemLink
            to="/admin-dashboard/forum/create-forum"
            primaryText="Create Forum"
            onClick={() => navigate('/admin-dashboard/forum/create-forum')}
          />
        </List>
      </Collapse>
      <MenuItemLink
        to="#"
        primaryText="Order Management"
        leftIcon={<LocalShippingIcon />}
        onClick={() => handleClick('order')}
      />
      <Collapse in={open.order} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <MenuItemLink
            to="/admin-dashboard/orders/current-orders"
            primaryText="Current Orders"
            onClick={() => navigate('/admin-dashboard/orders/current-orders')}
          />
          <MenuItemLink
            to="/admin-dashboard/orders/order-history"
            primaryText="Order History"
            onClick={() => navigate('/admin-dashboard/orders/order-history')}
          />
        </List>
      </Collapse>
      <MenuItemLink
        to="#"
        primaryText="Account"
        leftIcon={<AccountCircleIcon />}
        onClick={() => handleClick('account')}
      />
      <Collapse in={open.account} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <MenuItemLink
            to="/admin-dashboard/account/my-profile"
            primaryText="My Profile"
            onClick={() => navigate('/admin-dashboard/account/my-profile')}
          />
          <MenuItemLink
            to="/admin-dashboard/account/my-settings"
            primaryText="My Settings"
            onClick={() => navigate('/admin-dashboard/account/my-settings')}
          />
          <MenuItemLink
            to="/admin-dashboard/account/logout"
            primaryText="Logout"
            onClick={() => navigate('/admin-dashboard/account/logout')}
          />
        </List>
      </Collapse>
    </Menu>
  );
};

export default CustomSidebar;
