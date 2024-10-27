// /src/components/admin/tabs/AppointmentsTab.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const AppointmentsTab = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get(apiUrl+'/appointments')
      .then(response => setAppointments(response.data))
      .catch(error => console.error('Error fetching appointments:', error));
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Appointments</Typography>
      {appointments.map((appointment) => (
        <Paper key={appointment._id} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">{appointment.name}</Typography>
          <Typography>{appointment.date}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default AppointmentsTab;
