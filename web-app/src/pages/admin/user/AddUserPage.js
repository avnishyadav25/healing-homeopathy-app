// /src/pages/admin/user/AddUserPage.js
import React from 'react';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import AddUser from '../../../components/admin/user/AddUser'; // Create AddUser component

const AddUserPage = () => {
  return (
    <AdminPageTemplate>
      <AddUser />
    </AdminPageTemplate>
  );
};

export default AddUserPage;
