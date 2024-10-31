// src/pages/admin/user/EditUserPage.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../../../services/userService';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import UserForm from '../../../components/admin/user/UserForm';

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const data = await getUserById(id);
      setUser(data);
    };
    loadUser();
  }, [id]);

  const handleUpdateUser = async (updatedData) => {
    await updateUser(id, updatedData);
    navigate(`/admin/users/view/${id}`);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <AdminPageTemplate>
      <UserForm initialData={user} onSubmit={handleUpdateUser} isEditMode={true} />
    </AdminPageTemplate>
  );
};

export default EditUserPage;
