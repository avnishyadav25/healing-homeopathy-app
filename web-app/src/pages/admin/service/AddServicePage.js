// /src/pages/admin/service/AddServicePage.js
import React from 'react';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import ServiceForm from '../../../components/admin/service/ServiceForm';
import { createService } from '../../../services/serviceService';

const AddServicePage = () => (
  <AdminPageTemplate>
    <ServiceForm onSubmit={createService} />
  </AdminPageTemplate>
);

export default AddServicePage;
