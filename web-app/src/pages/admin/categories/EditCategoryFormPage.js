// /src/pages/admin/categories/EditCategoryFormPage.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryById, updateCategory } from '../../../services/categoryService';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import CategoryForm from '../../../components/admin/categories/CategoryForm';

const EditCategoryFormPage = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getCategoryById(id);
      setInitialData(data);
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (categoryData) => {
    await updateCategory(id, categoryData);
  };

  if (!initialData) return <p>Loading...</p>;

  return (
    <AdminPageTemplate title="Edit Category">
      <CategoryForm initialData={initialData} onSubmit={handleSubmit} isEditMode />
    </AdminPageTemplate>
  );
};

export default EditCategoryFormPage;
