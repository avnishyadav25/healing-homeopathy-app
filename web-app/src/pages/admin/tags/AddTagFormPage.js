// /src/pages/admin/tags/AddTagFormPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTag } from '../../../services/tagService';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import { TextField, Button, Box, Snackbar, Alert } from '@mui/material';

const AddTagFormPage = () => {
  const navigate = useNavigate();
  const [tagName, setTagName] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTag({ name: tagName });
      setSnackbar({ open: true, message: 'Tag created successfully!', severity: 'success' });
      setTimeout(() => navigate('/admin/tags'), 2000); // Redirect after success
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to create tag. Please try again.', severity: 'error' });
    }
  };

  return (
    <AdminPageTemplate title="Add New Tag">
      <Box component="form" onSubmit={handleSubmit} p={3}>
        <TextField
          fullWidth
          label="Tag Name"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          required
        />
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">Save Tag</Button>
        </Box>
      </Box>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ open: false })}>
        <Alert onClose={() => setSnackbar({ open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AdminPageTemplate>
  );
};

export default AddTagFormPage;
