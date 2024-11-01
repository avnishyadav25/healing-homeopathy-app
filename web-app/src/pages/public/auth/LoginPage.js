// /web-app/src/pages/LoginPage.js

import React from 'react';
import { Container, Grid, Box, Typography, Paper } from '@mui/material';
import LoginForm from '../../../components/public/auth/LoginForm';
import loginHereImage from '../../../assets/login-here1.jpg';
import Template from '../../../components/common/Template';
import SectionDivider from '../../../components/public/common/SectionDivider';



const LoginPage = () => {
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
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Why Log In?
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                By logging into Healing Homoeopathy, you gain access to:
              </Typography>
              <ul>
                <Typography component="li" variant="body2" gutterBottom>
                  Your personalized treatment plans
                </Typography>
                <Typography component="li" variant="body2" gutterBottom>
                  Consultations with experienced homeopathic doctors
                </Typography>
                <Typography component="li" variant="body2" gutterBottom>
                  Exclusive health tips and updates
                </Typography>
                <Typography component="li" variant="body2" gutterBottom>
                  Priority access to our natural remedies and wellness programs
                </Typography>
                <Typography component="li" variant="body2" gutterBottom>
                  Special offers on products and services
                </Typography>
              </ul>
            </Grid>
            <Grid item xs={12} md={6}>
              <LoginForm />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
    <SectionDivider color="#004d40" thickness="3px" margin="40px 0" />
    </Template>
    </div>
  );
};

export default LoginPage;
