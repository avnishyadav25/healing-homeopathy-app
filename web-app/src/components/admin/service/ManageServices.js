import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, TextField, Grid, Paper, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const apiUrl = process.env.REACT_APP_API_URL;


const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [newService, setNewService] = useState({
    title: '',
    image: '',
    description: '',
    link: '',
    patients: 0,
    details: '',
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(apiUrl+'/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services', error);
    }
  };

  const handleInputChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingService) {
      await updateService(editingService._id, newService);
    } else {
      await createService(newService);
    }
  };

  const createService = async (service) => {
    try {
      await axios.post('/api/services', service);
      setNewService({
        title: '',
        image: '',
        description: '',
        link: '',
        patients: 0,
        details: '',
      });
      fetchServices();
    } catch (error) {
      console.error('Error creating service', error);
    }
  };

  const updateService = async (id, service) => {
    try {
      await axios.put(`/api/services/${id}`, service);
      setEditingService(null);
      fetchServices();
    } catch (error) {
      console.error('Error updating service', error);
    }
  };

  const deleteService = async (id) => {
    try {
      await axios.delete(`/api/services/${id}`);
      fetchServices();
    } catch (error) {
      console.error('Error deleting service', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Manage Services</Typography>
      <Paper sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Title" name="title" value={newService.title} onChange={handleInputChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Image URL" name="image" value={newService.image} onChange={handleInputChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Description" name="description" value={newService.description} onChange={handleInputChange} fullWidth required multiline rows={4} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Link" name="link" value={newService.link} onChange={handleInputChange} fullWidth required />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Patients" name="patients" type="number" value={newService.patients} onChange={handleInputChange} fullWidth required />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Details (comma separated)" name="details" value={newService.details} onChange={handleInputChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">{editingService ? 'Update' : 'Create'} Service</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <List>
        {services.map((service) => (
          <ListItem key={service._id} divider>
            <ListItemText primary={service.title} secondary={service.description} />
            <IconButton onClick={() => setEditingService(service)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deleteService(service._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ManageServices;
