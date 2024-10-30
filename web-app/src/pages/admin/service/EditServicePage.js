// /src/pages/admin/service/EditServicePage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import ServiceForm from '../../../components/admin/service/ServiceForm';
import { fetchServiceById, updateService } from '../../../services/serviceService';

const EditServicePage = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const loadService = async () => {
      const data = await fetchServiceById(id);
      setInitialData(data);
    };
    loadService();
  }, [id]);

  if (!initialData) return <p>Loading...</p>;

  return (
    <AdminPageTemplate>
      <ServiceForm initialData={initialData} onSubmit={(data) => updateService(id, data)} isEditMode />
    </AdminPageTemplate>
  );
};

export default EditServicePage;
