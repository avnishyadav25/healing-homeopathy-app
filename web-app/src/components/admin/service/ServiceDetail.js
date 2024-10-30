// /src/components/admin/services/ServiceDetail.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, Paper, Grid, ImageList, ImageListItem } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminPageTemplate from '../AdminPageTemplate'; // Import the template wrapper

const apiUrl = process.env.REACT_APP_API_URL;

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${apiUrl}/services/${id}`)
      .then(response => setService(response.data))
      .catch(error => console.error('Error fetching service:', error));
  }, [id]);

  const handleEditToggle = () => setEditMode(!editMode);

  const handleSave = () => {
    axios.put(`${apiUrl}/services/${id}`, service)
      .then(() => {
        setEditMode(false);
        alert('Service updated successfully');
      })
      .catch(error => console.error('Error updating service:', error));
  };

  const handleBackClick = () => {
    navigate('/admin/services'); // Navigate back to the services tab
  };

  if (!service) return <Typography>Loading...</Typography>;

  return (
    <AdminPageTemplate>
      <Box>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" gutterBottom>
              {editMode ? (
                <TextField
                  fullWidth
                  label="Title"
                  value={service.title}
                  onChange={(e) => setService({ ...service, title: e.target.value })}
                />
              ) : (
                service.title
              )}
            </Typography>
            <Button variant="contained" onClick={handleBackClick}>Back to Services</Button>
          </Box>

          <Grid container spacing={4}>
            {/* First Column: Details */}
            <Grid item xs={12} md={6}>
              <Box>
                {editMode ? (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Link"
                        value={service.link}
                        onChange={(e) => setService({ ...service, link: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Description"
                        value={service.description}
                        multiline
                        rows={4}
                        onChange={(e) => setService({ ...service, description: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Patients"
                        type="number"
                        value={service.patients}
                        onChange={(e) => setService({ ...service, patients: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Details"
                        multiline
                        rows={4}
                        value={service.details.join(', ')}
                        onChange={(e) => setService({ ...service, details: e.target.value.split(', ') })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" onClick={handleSave}>Save</Button>
                      <Button variant="outlined" onClick={handleEditToggle} sx={{ ml: 2 }}>Cancel</Button>
                    </Grid>
                  </Grid>
                ) : (
                  <>
                    <Typography variant="body1" sx={{ mb: 2 }}>Link: {service.link}</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>Description: {service.description}</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>Patients: {service.patients}</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>Details: {service.details.join(', ')}</Typography>
                    <Button variant="outlined" onClick={handleEditToggle} sx={{ mt: 2 }}>Edit</Button>
                  </>
                )}
              </Box>
            </Grid>

            {/* Second Column: Image */}
            <Grid item xs={12} md={6}>
              {editMode ? (
                <Box>
                  <TextField
                    fullWidth
                    label="Image URL"
                    value={service.image}
                    onChange={(e) => setService({ ...service, image: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                  <ImageList sx={{ width: '100%', height: 400 }} cols={1}>
                    <ImageListItem>
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  </ImageList>
                </Box>
              ) : (
                <ImageList sx={{ width: '100%', height: 400 }} cols={1}>
                  <ImageListItem>
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                </ImageList>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </AdminPageTemplate>
  );
};

export default ServiceDetail;