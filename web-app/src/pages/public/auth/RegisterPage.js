// /web-app/src/pages/RegisterPage.js

import React from 'react';
import RegisterForm from '../../../components/public/auth/RegisterForm';
import { Box, Container } from '@mui/material';
import Template from '../../../components/common/Template';
import SectionDivider from '../../../components/public/common/SectionDivider';




const RegisterPage = () => {
  return (
    <div>
      <Template>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        pt: { xs: 8, sm: 12 }, // Padding to prevent overlap with the header
        pb: 4,
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="sm">
        <RegisterForm />
      </Container>
    </Box>
    <SectionDivider color="#004d40" thickness="3px" margin="40px 0" />
    </Template>
    </div>
  );
};

export default RegisterPage;
