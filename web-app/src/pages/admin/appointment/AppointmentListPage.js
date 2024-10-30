// src/pages/admin/appointments/AppointmentListPage.js
import React from 'react';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import AppointmentList from '../../../components/admin/appointment/AppointmentList';

const AppointmentListPage = () => (
  <AdminPageTemplate>
    <AppointmentList />
  </AdminPageTemplate>
);

export default AppointmentListPage;
