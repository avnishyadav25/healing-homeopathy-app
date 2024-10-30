// /src/components/admin/appointments/AppointmentList.js
import React, { useEffect, useState } from 'react';
import { fetchAppointments, updateAppointmentStatus, deleteAppointment } from '../../../services/appointmentService';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Select, MenuItem, Checkbox, IconButton, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, Edit, Delete } from '@mui/icons-material';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [tabValue, setTabValue] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    loadAppointments();
  }, [tabValue]);

  const loadAppointments = async () => {
    const data = await fetchAppointments();
    const filteredData = tabValue === 'all' ? data : data.filter((appointment) => appointment.status === tabValue);
    setAppointments(filteredData);
  };

  const handleStatusChange = async (id, status) => {
    await updateAppointmentStatus(id, status);
    loadAppointments();
  };

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    loadAppointments();
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Appointments</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/admin/appointments/create')}>
          Add Appointment
        </Button>
      </Box>

      <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
        <Tab label="All" value="all" />
        <Tab label="Pending" value="pending" />
        <Tab label="Confirmed" value="confirmed" />
        <Tab label="Completed" value="completed" />
        <Tab label="Cancelled" value="cancelled" />
        <Tab label="Archived" value="archive" />
      </Tabs>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={selectedAppointments.length === appointments.length}
                onChange={() => setSelectedAppointments(selectedAppointments.length === appointments.length ? [] : appointments.map(a => a._id))}
              />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Problem</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment._id}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAppointments.includes(appointment._id)}
                  onChange={() => setSelectedAppointments((prev) =>
                    prev.includes(appointment._id) ? prev.filter((id) => id !== appointment._id) : [...prev, appointment._id]
                  )}
                />
              </TableCell>
              <TableCell>{appointment.name}</TableCell>
              <TableCell>{appointment.email}</TableCell>
              <TableCell>{appointment.mobile}</TableCell>
              <TableCell>{appointment.location}</TableCell>
              <TableCell>{appointment.problem}</TableCell>
              <TableCell>{new Date(appointment.appointmentDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Select
                  value={appointment.status}
                  onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="confirmed">Confirmed</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                  <MenuItem value="archive">Archived</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => navigate(`/admin/appointments/view/${appointment._id}`)}>
                  <Visibility />
                </IconButton>
                <IconButton color="secondary" onClick={() => navigate(`/admin/appointments/edit/${appointment._id}`)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(appointment._id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AppointmentList;
