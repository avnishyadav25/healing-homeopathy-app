// /src/pages/admin/appointment/AddAppointmentUserPage.js
import React from 'react';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import AddAppointmentUser from '../../../components/admin/appointment/AddAppointmentUser'; // Create AddAppointmentUser component

const AddAppointmentUserPage = () => {
  return (
    <AdminPageTemplate>
      <AddAppointmentUser />
    </AdminPageTemplate>
  );
};

export default AddAppointmentUserPage;
