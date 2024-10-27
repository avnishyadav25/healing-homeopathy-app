// /web-app/src/pages/public/AppointmentPage.js

import React from 'react';
import { Container } from '@mui/material';
import AppointmentForm from '../../components/public/AppointmentForm';
import SectionDivider from '../../components/SectionDivider';


const AppointmentPage = () => {
  return (
    <div>
        <Container maxWidth="sm" sx={{ mt: '150px' }}>
            <AppointmentForm />
        </Container>
        <SectionDivider color="#004d40" thickness="3px" margin="40px 0" />

    </div>
    
    
    
  );
};

export default AppointmentPage;
