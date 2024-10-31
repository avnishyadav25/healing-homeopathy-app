// /src/components/admin/tags/TagForm.js

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';

const TagForm = ({ initialData = {}, onSubmit, isEditMode = false }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setSnackbar({ open: true, message: `Tag ${isEditMode ? 'updated' : 'created'} successfully!`, severity: 'success' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} p={3}>
      <Typography variant="h4" gutterBottom>{isEditMode ? 'Edit Tag' : 'Create New Tag'}</Typography>
      <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} required sx={{ mb: 2 }} />
      <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} multiline rows={4} sx={{ mb: 2 }} />
      <Button type="submit" variant="contained" color="primary">
        {isEditMode ? 'Update Tag' : 'Create Tag'}
      </Button>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TagForm;
