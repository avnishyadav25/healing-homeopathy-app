// /src/pages/admin/categories/AddCategoryFormPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '../../../services/categoryService';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import CategoryForm from '../../../components/admin/categories/CategoryForm';
import { Snackbar, Alert } from '@mui/material';

const AddCategoryFormPage = () => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar

  const handleSubmit = async (categoryData) => {
    try {
      await createCategory(categoryData);
      setSnackbarOpen(true); // Open success message
      setTimeout(() => {
        setSnackbarOpen(false); // Close message
        navigate('/admin/categories'); // Redirect to category page
      }, 2000); // Delay for snackbar visibility
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <AdminPageTemplate title="Add New Category">
      <CategoryForm onSubmit={handleSubmit} />
      
      {/* Snackbar for success message */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Category saved successfully!
        </Alert>
      </Snackbar>
    </AdminPageTemplate>
  );
};

export default AddCategoryFormPage;
