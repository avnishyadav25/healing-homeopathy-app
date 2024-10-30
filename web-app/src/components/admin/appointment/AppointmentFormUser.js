// /src/components/admin/appointment/AppointmentFormUser.js
import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Button, Typography, MenuItem, Paper } from '@mui/material';

const AppointmentFormUser = ({ initialData = {}, onSubmit, isEditMode = false }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    email: initialData.email || '',
    mobile: initialData.mobile || '',
    location: initialData.location || '',
    problem: initialData.problem || '',
    appointmentDate: '',
    status: initialData.status || 'pending',
  });

  useEffect(() => {
    // Format appointmentDate to `YYYY-MM-DDTHH:MM` if initialData.appointmentDate exists
    if (initialData.appointmentDate) {
      const date = new Date(initialData.appointmentDate);
      const formattedDate = date.toISOString().slice(0, 16); // `YYYY-MM-DDTHH:MM`
      setFormData((prev) => ({ ...prev, appointmentDate: formattedDate }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        {isEditMode ? 'Edit Appointment' : 'Add Appointment'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="User Name"
              name="name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobile"
              variant="outlined"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              variant="outlined"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Problem"
              name="problem"
              variant="outlined"
              multiline
              rows={4}
              value={formData.problem}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Appointment Date"
              name="appointmentDate"
              variant="outlined"
              type="datetime-local"
              value={formData.appointmentDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Status"
              name="status"
              variant="outlined"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
              <MenuItem value="archive">Archived</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button variant="contained" color="primary" type="submit">
                {isEditMode ? 'Update Appointment' : 'Add Appointment'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AppointmentFormUser;
