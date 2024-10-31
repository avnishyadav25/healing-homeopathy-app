// /src/pages/admin/categories/AddCategoryFormPage.js

import React from 'react';
import { createCategory } from '../../../services/categoryService';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import CategoryForm from '../../../components/admin/categories/CategoryForm';

const AddCategoryFormPage = () => {
  const handleSubmit = async (categoryData) => {
    await createCategory(categoryData);
  };

  return (
    <AdminPageTemplate title="Add New Category">
      <CategoryForm onSubmit={handleSubmit} />
    </AdminPageTemplate>
  );
};

export default AddCategoryFormPage;
