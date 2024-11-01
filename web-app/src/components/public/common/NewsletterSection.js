// src/components/NewsletterSection.js

import React from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import newsletterImage from '../../../assets/newsletter.jpg'; // Ensure the image path is correct

const NewsletterSection = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'black', color: 'white' }}>
      <Container>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <img src={newsletterImage} alt="Newsletter" style={{ width: '100%', borderRadius: '8px' }} />
          </Grid>
          <Grid item xs={12} md={6} textAlign="center">
            <Typography variant="h4" gutterBottom>
              Ready to Start Your Journey to Better Health?
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Contact us today to book your personalized consultation or subscribe to our newsletter to stay updated on our services.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button 
                variant="contained" 
                color="success" 
                size="large" 
                href="/book-appointment" 
                sx={{ mr: 2 }}
              >
                Book Consultation
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                href="/subscribe"
              >
                Subscribe to Newsletter
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NewsletterSection;
