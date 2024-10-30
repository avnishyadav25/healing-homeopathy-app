// /src/components/admin/comments/CommentForm.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const CommentForm = ({ initialData = {}, onSubmit, isEditMode = false }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    text: initialData.text || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} p={3}>
      <Typography variant="h6">{isEditMode ? 'Edit Comment' : 'Add Comment'}</Typography>
      <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} required />
      <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} />
      <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
      <TextField fullWidth label="Comment" name="text" multiline rows={4} value={formData.text} onChange={handleChange} required />
      <Button type="submit" variant="contained" color="primary">
        {isEditMode ? 'Update Comment' : 'Add Comment'}
      </Button>
    </Box>
  );
};

export default CommentForm;
