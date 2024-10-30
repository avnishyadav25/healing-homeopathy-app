// /src/components/admin/appointment/AddAppointmentUser.js
import React from 'react';
import AppointmentFormUser from './AppointmentFormUser';
import axios from 'axios';

const AddAppointmentUser = () => {
  const handleAddAppointment = async (formData) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/appointments/create`, formData);
      alert('Appointment added successfully');
    } catch (error) {
      console.error('Error adding appointment', error);
    }
  };

  return <AppointmentFormUser onSubmit={handleAddAppointment} />;
};

export default AddAppointmentUser;
