// /web-app/src/pages/RegisterPage.js

import React from 'react';
import { useTheme } from '@mui/material/styles';
import RegisterForm from '../../../components/public/auth/RegisterForm';
import { Box, Container } from '@mui/material';
import Template from '../../../components/common/Template';
import loginHereImage from '../../../assets/black-shade.jpg';


const RegisterPage = () => {
  const theme = useTheme();
  
  return (
    <div>
      <Template>
      <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundImage: `url(${loginHereImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            py: 8,
          }}
        >
          <Container maxWidth="sm">
            <RegisterForm />
          </Container>
        </Box>
      </Template>
    </div>
  );
};

export default RegisterPage;
