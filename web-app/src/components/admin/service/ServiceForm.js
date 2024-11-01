import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Grid, Select, MenuItem, Typography, IconButton, Avatar, Snackbar, Alert, CardMedia } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import uploadFile from '../../../services/uploadService'; // Import the upload service

const baseURL = process.env.REACT_APP_API_URL;

const ServiceForm = ({ initialData = {}, onSubmit, isEditMode = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    shortDescription: initialData.shortDescription || '',
    description: initialData.description || '',
    link: initialData.link || '',
    patients: initialData.patients || 0,
    details: initialData.details || [''],
    duration: initialData.duration || '',
    cost: initialData.cost || 0,
    status: initialData.status || 'draft',
    image: initialData.image || '',
    _id: initialData._id,
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Auto-generate the link based on title
  useEffect(() => {
    if (formData.title && !isEditMode) {
      setFormData((prev) => ({
        ...prev,
        link: `services/${prev.title.toLowerCase().replace(/ /g, '-')}`,
      }));
    }
  }, [formData.title, isEditMode]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!formData.title || !formData.link) {
      setSnackbar({
        open: true,
        message: 'Please provide a title and link before uploading an image.',
        severity: 'warning',
      });
      return;
    }

    if (file) {
      try {
        const folderPath = `services/${formData.title.toLowerCase().replace(/ /g, '-')}`;
        const imageUrl = await uploadFile(file, folderPath); // Specify folder for image upload
        setFormData((prev) => ({ ...prev, image: imageUrl }));
        setSnackbar({ open: true, message: 'Image uploaded successfully!', severity: 'success' });
      } catch (error) {
        setSnackbar({ open: true, message: 'Error uploading image. Please try again.', severity: 'error' });
      }
    } 
  };

  const handleDetailChange = (index, value) => {
    const updatedDetails = [...formData.details];
    updatedDetails[index] = value;
    setFormData((prev) => ({ ...prev, details: updatedDetails }));
  };

  const addDetailRow = () => setFormData((prev) => ({ ...prev, details: [...prev.details, ''] }));

  const removeDetailRow = (index) => {
    const updatedDetails = formData.details.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, details: updatedDetails }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData };

    try {
      await onSubmit(data); // Pass data for backend processing
      setSnackbar({ open: true, message: 'Service saved successfully!', severity: 'success' });
      navigate(`/admin/services/view/${formData._id}`);
    } catch (error) {
      setSnackbar({ open: true, message: 'Error saving service. Please try again.', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} p={3}>
      <Typography variant="h4" gutterBottom>{isEditMode ? 'Edit Service' : 'Add New Service'}</Typography>
      <Grid container spacing={3}>
        
        {/* Row 1 */}
        <Grid item xs={9}>
          <TextField fullWidth label="Title" name="title" value={formData.title} onChange={handleChange} required />
        </Grid>
        <Grid item xs={3}>
          <Select fullWidth name="status" value={formData.status} onChange={handleChange}>
            <MenuItem value="published">Published</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="archived">Archived</MenuItem>
          </Select>
        </Grid>

        {/* Row 2 */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Short Description"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            required
            multiline
            rows={3}
          />
        </Grid>

        {/* Row 3 */}
        <Grid item xs={9}>
          <TextField fullWidth label="Link" name="link" value={formData.link} onChange={handleChange} required />
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth label="Patients" name="patients" type="number" value={formData.patients} onChange={handleChange} required />
        </Grid>

        {/* Row 4 */}
        <Grid item xs={4}>
          <Typography>Image</Typography>
          <Button variant="contained" component="label">
            Upload
            <input type="file" hidden onChange={handleImageUpload} />
          </Button>
          {formData.image && (
              <CardMedia
                component="img"
                image={`${baseURL}${formData.image}`}
                alt={formData.title}
                sx={{ width: '100%', height: 150 }}
              />
            )}
          
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth label="Duration" name="duration" value={formData.duration} onChange={handleChange} />
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth label="Cost" name="cost" type="number" value={formData.cost} onChange={handleChange} />
        </Grid>

        {/* Row 5 - Details */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>Details</Typography>
          <Grid container spacing={2}>
            {formData.details.map((detail, index) => (
              <Grid item xs={6} key={index} display="flex" alignItems="center">
                <TextField
                  fullWidth
                  label={`Detail ${index + 1}`}
                  value={detail}
                  onChange={(e) => handleDetailChange(index, e.target.value)}
                  required
                />
                <IconButton color="secondary" onClick={() => removeDetailRow(index)} disabled={formData.details.length === 1}>
                  <Delete />
                </IconButton>
              </Grid>
            ))}
          </Grid>
          <Button variant="outlined" onClick={addDetailRow} startIcon={<Add />} sx={{ mt: 2 }}>
            Add New Row
          </Button>
        </Grid>

        {/* Row 6 - Description */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            multiline
            rows={5}
          />
        </Grid>

        {/* Row 7 - Buttons */}
        <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
          <Button type="submit" variant="contained" color="primary">
            {isEditMode ? 'Update Service' : 'Save Service'}
          </Button>
          <Button variant="outlined" onClick={() => navigate(`/admin/services/view/${formData._id}`)}>
            View
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => navigate(`/admin/services`)}>
            Cancel
          </Button>
        </Grid>
      </Grid>

      {/* Snackbar for success/error messages */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ServiceForm;
