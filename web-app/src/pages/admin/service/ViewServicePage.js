// /src/pages/admin/service/ViewServicePage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import { fetchServiceById } from '../../../services/serviceService';
import { Box, Typography, Grid, Avatar, Button, Divider, CardMedia } from '@mui/material';

const ViewServicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const baseURL = process.env.REACT_APP_API_URL; // Get base API URL

  useEffect(() => {
    const loadService = async () => {
      const data = await fetchServiceById(id);
      setService(data);
    };
    loadService();
  }, [id]);

  if (!service) return <p>Loading...</p>;

  return (
    <AdminPageTemplate>
      <Box p={4}>
        {/* Row 1: Title and Status */}
        <Grid container spacing={2} alignItems="center" mb={2}>
          <Grid item xs={9}>
            <Typography variant="h4">{service.title}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Status: {service.status}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Row 2: Short Description */}
        <Grid item xs={12} mb={2}>
          <Typography variant="body1">Short Description:</Typography>
          <Typography>{service.shortDescription}</Typography>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Row 3: Link and Patients */}
        <Grid container spacing={2} mb={2}>
          <Grid item xs={9}>
            <Typography variant="body1">Link:</Typography>
            <Typography>{service.link}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1">Patients:</Typography>
            <Typography>{service.patients}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Row 4: Image, Duration, and Cost */}
        <Grid container spacing={2} mb={2}>
          <Grid item xs={4}>
            <Typography variant="body1">Image:</Typography>
            {service.image && (
              <CardMedia
                component="img"
                image={`${baseURL}${service.image}`}
                alt={service.title}
                sx={{ width: '100%', height: 150 }}
              />
            )}
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Duration:</Typography>
            <Typography>{service.duration}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Cost:</Typography>
            <Typography>${service.cost}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Row 5: Details */}
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Details</Typography>
          </Grid>
          {service.details.map((detail, index) => (
            <Grid item xs={6} key={index}>
              <Typography>{index + 1}. {detail}</Typography>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Row 6: Description */}
        <Grid item xs={12} mb={2}>
          <Typography variant="h6">Description</Typography>
          <Typography>{service.description}</Typography>
        </Grid>

        {/* Row 7: Action Buttons */}
        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" color="primary" onClick={() => navigate(`/admin/services/edit/${service._id}`)}>
            Edit
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => navigate('/admin/services')}>
            Cancel
          </Button>
        </Box>
      </Box>
    </AdminPageTemplate>
  );
};

export default ViewServicePage;
