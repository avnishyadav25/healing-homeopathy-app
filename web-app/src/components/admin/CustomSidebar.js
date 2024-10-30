// /web-app/src/components/admin/CustomSidebar.js

import React, { useState } from 'react';
import {
  DashboardMenuItem,
  MenuItemLink,
  useSidebarState,
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
  Business as BusinessIcon,
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
        onClick={() => navigate('/admin')}
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
            to="/admin/blog/all-blogs"
            primaryText="All Blogs"
            onClick={() => navigate('/admin/blog/all-blogs')}
          />
          <MenuItemLink
            to="/admin/blog/create-blog"
            primaryText="Create Blog"
            onClick={() => navigate('/admin/blog/create-blog')}
          />
          <MenuItemLink
            to="/admin/blog/comments"
            primaryText="Comments"
            onClick={() => navigate('/admin/blog/comments')}
          />
          <MenuItemLink
            to="/admin/blog/media"
            primaryText="Media"
            onClick={() => navigate('/admin/blog/media')}
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
            to="/admin/forum/all-forums"
            primaryText="All Forums"
            onClick={() => navigate('/admin/forum/all-forums')}
          />
          <MenuItemLink
            to="/admin/forum/create-forum"
            primaryText="Create Forum"
            onClick={() => navigate('/admin/forum/create-forum')}
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
            to="/admin/orders/current-orders"
            primaryText="Current Orders"
            onClick={() => navigate('/admin/orders/current-orders')}
          />
          <MenuItemLink
            to="/admin/orders/order-history"
            primaryText="Order History"
            onClick={() => navigate('/admin/orders/order-history')}
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
            to="/admin/account/my-profile"
            primaryText="My Profile"
            onClick={() => navigate('/admin/account/my-profile')}
          />
          <MenuItemLink
            to="/admin/account/my-settings"
            primaryText="My Settings"
            onClick={() => navigate('/admin/account/my-settings')}
          />
          <MenuItemLink
            to="/admin/account/logout"
            primaryText="Logout"
            onClick={() => navigate('/admin/account/logout')}
          />
        </List>
      </Collapse>
      <MenuItemLink
        to="/admin/company"
        primaryText="Company"
        leftIcon={<BusinessIcon />}
        onClick={() => navigate('/admin/company')}
      />
    </Menu>
  );
};

export default CustomSidebar;
