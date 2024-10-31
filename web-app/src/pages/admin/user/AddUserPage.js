// src/pages/admin/user/AddUserPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../services/userService';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import UserForm from '../../../components/admin/user/UserForm';

const AddUserPage = () => {
  const navigate = useNavigate();

  const handleCreateUser = async (userData) => {
    await createUser(userData);
    navigate('/admin/users');
  };

  return (
    <AdminPageTemplate>
      <UserForm onSubmit={handleCreateUser} />
    </AdminPageTemplate>
  );
};

export default AddUserPage;
