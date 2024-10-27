// /src/components/admin/appointment/AddAppointmentUser.js
import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Grid, Typography, Box } from '@mui/material';
import axios from 'axios';

const AddAppointmentUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [problem, setProblem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentData = { name, email, mobile, problem };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/appointments/add`, appointmentData);
      alert('Appointment added successfully');
    } catch (error) {
      console.error('Error adding appointment', error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            Add Appointment User
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="User Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mobile Number"
                variant="outlined"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Problem"
                variant="outlined"
                multiline
                rows={4}
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" color="primary">
                  Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Add Appointment
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddAppointmentUser;
