// /src/pages/admin/users/UserFormListPage.js
import React from 'react';
import UserFormList from '../../../components/admin/user/UserFormList';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';

const UserFormListPage = () => {
  return (
    <AdminPageTemplate title="User Management">
      <UserFormList />
    </AdminPageTemplate>
  );
};

export default UserFormListPage;
