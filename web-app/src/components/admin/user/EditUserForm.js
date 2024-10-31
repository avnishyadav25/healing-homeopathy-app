// /src/components/admin/users/EditUserForm.js
import React from 'react';
import UserForm from './UserForm';

const EditUserForm = ({ initialData, onSubmit }) => (
  <UserForm initialData={initialData} onSubmit={onSubmit} isEditMode={true} />
);

export default EditUserForm;
