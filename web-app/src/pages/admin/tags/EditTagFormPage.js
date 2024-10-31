// /src/pages/admin/tags/EditTagFormPage.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTagById, updateTag } from '../../../services/tagService';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import { TextField, Button, Box, Snackbar, Alert } from '@mui/material';

const EditTagFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tagName, setTagName] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchTag = async () => {
      try {
        const data = await getTagById(id);
        setTagName(data.name);
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to load tag data.', severity: 'error' });
      }
    };
    fetchTag();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTag(id, { name: tagName });
      setSnackbar({ open: true, message: 'Tag updated successfully!', severity: 'success' });
      setTimeout(() => navigate('/admin/tags'), 2000); // Redirect after success
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to update tag.', severity: 'error' });
    }
  };

  return (
    <AdminPageTemplate title="Edit Tag">
      <Box component="form" onSubmit={handleSubmit} p={3}>
        <TextField
          fullWidth
          label="Tag Name"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          required
        />
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">Update Tag</Button>
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

export default EditTagFormPage;
