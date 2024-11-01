// /src/components/NewsletterSignupSection.js

import React from 'react';
import { Box, Container, Grid, Typography, Grow, Fade } from '@mui/material';
import NewsletterForm from '../../common/NewsletterForm';

const NewsletterSignupSection = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Grid container justifyContent="center" textAlign="center">
          <Grid item xs={12}>
            <Grow in timeout={1000}>
              <Typography variant="h4" gutterBottom>
                Stay Updated
              </Typography>
            </Grow>
            <Fade in timeout={1500}>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Subscribe to our newsletter for the latest in Homoeopathy, wellness tips, and exclusive offers.
              </Typography>
            </Fade>
            
              <NewsletterForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NewsletterSignupSection;
