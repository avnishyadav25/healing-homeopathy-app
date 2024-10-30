import React, { useEffect, useState } from 'react';
import AdminPageTemplate from '../../components/admin/AdminPageTemplate';
import CompanyForm from '../../components/admin/company/CompanyForm';
import { fetchCompanyInfo, updateCompanyInfo, createCompanyInfo } from '../../services/companyService';
import { Box, CircularProgress, Typography, Snackbar, Alert } from '@mui/material';

const CompanyPage = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [companyId, setCompanyId] = useState(null); // Store the company ID
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const loadCompanyInfo = async () => {
      try {
        const data = await fetchCompanyInfo();
        console.log('#### fetch data', data);

        if (!data) {
          // If no company info, create a new one with default data
          const createdData = await createCompanyInfo({
            name: 'Your Company Name', // Replace with desired default values
            tagline: 'Your Tagline',
            description: '',
            shortDescription: '',
            address: '',
            timezone: 'UTC',
            language: 'en',
            phone: '',
            email: '',
            socialLinks: {
              facebook: '',
              twitter: '',
              linkedin: '',
              instagram: ''
            },
          });
          setFormData(createdData);
          setCompanyId(createdData._id); // Store created company's ID
          setNotification({ open: true, message: 'Company info created successfully', severity: 'success' });
        } else {
          setFormData(data);
          setCompanyId(data._id); // Store existing company's ID
        }
      } catch (error) {
        console.error('Failed to load or create company info:', error);
        setNotification({ open: true, message: 'Failed to load or create company info', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };
    loadCompanyInfo();
  }, []);

  const handleFormSubmit = async (updatedData) => {
    try {
      const updatedInfo = await updateCompanyInfo(companyId, updatedData); // Pass the companyId
      setFormData(updatedInfo);
      setNotification({ open: true, message: 'Company information updated successfully', severity: 'success' });
    } catch (error) {
      console.error('Failed to update company info:', error);
      setNotification({ open: true, message: 'Error updating company information', severity: 'error' });
    }
  };

  if (loading) {
    return (
      <AdminPageTemplate>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Box>
      </AdminPageTemplate>
    );
  }

  return (
    <AdminPageTemplate>
      <Box px={4} py={3}>
        <Typography variant="h4" gutterBottom>
          Company Settings
        </Typography>
        <CompanyForm initialData={formData} onSubmit={handleFormSubmit} />
      </Box>
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </AdminPageTemplate>
  );
};

export default CompanyPage;
