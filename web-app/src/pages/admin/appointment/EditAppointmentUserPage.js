// /src/pages/admin/appointment/EditAppointmentUserPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import AppointmentFormUser from '../../../components/admin/appointment/AppointmentFormUser';
import { fetchAppointmentById, updateAppointment } from '../../../services/appointmentService';

const EditAppointmentUserPage = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const loadAppointment = async () => {
      const data = await fetchAppointmentById(id);
      setInitialData(data);
    };
    loadAppointment();
  }, [id]);

  const handleEditAppointment = async (updatedData) => {
    await updateAppointment(id, updatedData);
    alert('Appointment updated successfully');
  };

  return (
    <AdminPageTemplate>
      {initialData && <AppointmentFormUser initialData={initialData} onSubmit={handleEditAppointment} isEditMode />}
    </AdminPageTemplate>
  );
};

export default EditAppointmentUserPage;
