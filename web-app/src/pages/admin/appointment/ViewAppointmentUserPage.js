// /src/pages/admin/appointment/ViewAppointmentUserPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import { fetchAppointmentById, updateAppointmentStatus, deleteAppointment } from '../../../services/appointmentService';
import { Box, Typography, Button, Stack, Snackbar, Alert } from '@mui/material';

const ViewAppointmentUserPage = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  useEffect(() => {
    const loadAppointment = async () => {
      try {
        const data = await fetchAppointmentById(id);
        setAppointment(data);
      } catch (error) {
        console.error('Error loading appointment:', error);
        setNotification({ open: true, message: 'Failed to load appointment details', severity: 'error' });
      }
    };
    loadAppointment();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteAppointment(id);
      setNotification({ open: true, message: 'Appointment deleted successfully', severity: 'success' });
      navigate('/admin/appointments');
    } catch (error) {
      setNotification({ open: true, message: 'Failed to delete appointment', severity: 'error' });
    }
  };

  const handleCancel = async () => {
    try {
      await updateAppointmentStatus(id, 'cancelled');
      setAppointment((prev) => ({ ...prev, status: 'cancelled' }));
      setNotification({ open: true, message: 'Appointment cancelled successfully', severity: 'success' });
    } catch (error) {
      setNotification({ open: true, message: 'Failed to cancel appointment', severity: 'error' });
    }
  };

  if (!appointment) return <Typography>Loading...</Typography>;

  return (
    <AdminPageTemplate>
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          Appointment Details
        </Typography>
        <Typography>Name: {appointment.name}</Typography>
        <Typography>Email: {appointment.email}</Typography>
        <Typography>Mobile: {appointment.mobile}</Typography>
        <Typography>Location: {appointment.location}</Typography>
        <Typography>Problem: {appointment.problem}</Typography>
        <Typography>Date: {new Date(appointment.appointmentDate).toLocaleDateString()}</Typography>
        <Typography>Status: {appointment.status}</Typography>

        <Stack direction="row" spacing={2} mt={4}>
          <Button variant="contained" color="primary" onClick={() => navigate(`/admin/appointments/edit/${id}`)}>
            Edit Appointment
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCancel} disabled={appointment.status === 'cancelled'}>
            Cancel Appointment
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete Appointment
          </Button>
        </Stack>

        <Snackbar
          open={notification.open}
          autoHideDuration={4000}
          onClose={() => setNotification({ ...notification, open: false })}
        >
          <Alert onClose={() => setNotification({ ...notification, open: false })} severity={notification.severity}>
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </AdminPageTemplate>
  );
};

export default ViewAppointmentUserPage;
