// /web-app/src/pages/public/AppointmentPage.js

import React from 'react';
import { Container, Box } from '@mui/material';
import AppointmentForm from '../../../components/public/appointment/AppointmentForm';
import SectionDivider from '../../../components/public/common/SectionDivider';
import Template from '../../../components/common/Template';
import homepageCoverImage from '../../../assets/homepage-cover.jpg'; // Import the background image

const AppointmentPage = () => {
  return (
    <Template> 
      <Box
        sx={{
          backgroundImage: `url(${homepageCoverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh', // Ensures the background covers the viewport height
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          py: 4,
        }}
      >
        <Container maxWidth="sm" sx={{ mt: '150px', bgcolor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2, p: 4 }}>
          <AppointmentForm />
        </Container>
        <SectionDivider color="#004d40" thickness="3px" margin="40px 0" />
      </Box>
    </Template>
  );
};

export default AppointmentPage;
