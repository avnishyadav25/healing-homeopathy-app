// /web-app/src/components/ProtectedRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ requiredRole }) => {
  const token = localStorage.getItem('token'); // Check if the token is present
  const userRole = localStorage.getItem('role'); // Retrieve the role from localStorage
  console.log('#### token ', token);
  console.log('#### userRole ', userRole);
  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Redirect unauthorized users to the homepage
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
