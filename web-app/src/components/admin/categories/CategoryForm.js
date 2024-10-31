// /src/components/admin/categories/CategoryForm.js

import React, { useState } from 'react';
import { TextField, Button, Box, Snackbar, Alert } from '@mui/material';

const CategoryForm = ({ initialData = {}, onSubmit, isEditMode = false }) => {
  const [categoryName, setCategoryName] = useState(initialData.name || '');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit({ name: categoryName });
      setSnackbar({ open: true, message: isEditMode ? 'Category updated successfully!' : 'Category created successfully!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to save category. Please try again.', severity: 'error' });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} p={3}>
      <TextField
        fullWidth
        label="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        required
      />
      <Box mt={3}>
        <Button type="submit" variant="contained" color="primary">{isEditMode ? 'Update Category' : 'Save Category'}</Button>
      </Box>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ open: false })}>
        <Alert onClose={() => setSnackbar({ open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CategoryForm;
