// /src/components/ContactUsSection.js

import React from 'react';
import { Box, Container, Grid, Typography, Paper, Slide, Grow } from '@mui/material';
import ContactForm from '../../common/ContactForm'; // Import the standalone ContactForm component

const ContactUsSection = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Slide direction="left" in timeout={1000}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Contact Us
                </Typography>
                <ContactForm /> {/* Use the standalone ContactForm component */}
              </Paper>
            </Slide>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grow in timeout={1500}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Our Location
                </Typography>
                <Typography variant="body1" paragraph>
                  123 Wellness Lane, Health City
                </Typography>
                <Box
                  component="iframe"
                  sx={{ borderRadius: 2, boxShadow: 2 }}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609953785!2d72.74110177674371!3d19.08252231746409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cefa13a99d27%3A0x6bbd91a4fd79a5eb!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1625674826794!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  loading="lazy"
                  title="Google Map Location"
                ></Box>
              </Paper>
            </Grow>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactUsSection;
