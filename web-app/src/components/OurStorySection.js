// src/components/OurStorySection.js

import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, CardMedia, Fade, Slide, Zoom } from '@mui/material';
import storyImage from '../assets/story-image.jpg'; // Ensure you have an appropriate image

const OurStorySection = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container>
        <Fade in timeout={1000}>
          <Typography variant="h4" align="center" gutterBottom>
            Our Story
          </Typography>
        </Fade>
        <Grid container spacing={4} alignItems="center">
          {/* First Column: Image */}
          <Grid item xs={12} md={6}>
            <Zoom in timeout={1500}>
              <CardMedia
                component="img"
                image={storyImage}
                alt="Our Story"
                sx={{
                  width: '100%',
                  borderRadius: '8px',
                  boxShadow: (theme) => theme.shadows[4],
                }}
              />
            </Zoom>
          </Grid>

          {/* Second Column: Content */}
          <Grid item xs={12} md={6}>
            <Slide direction="up" in timeout={2000}>
              <Card sx={{ boxShadow: 'none', bgcolor: 'transparent' }}>
                <CardContent>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    Healing Homoeopathy was founded by Dr. Aparna Singh, a passionate advocate for natural medicine with over 4 years of experience in homeopathy. Our journey began with a vision to make homeopathic care accessible to everyone, blending ancient practices with modern science to offer a truly holistic approach to health.
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    From humble beginnings, we have grown into a trusted name in homeopathic care, known for our commitment to patient wellness and our innovative approach to natural healing. Our milestones include numerous successful treatments, a growing community of satisfied patients, and recognition in the field of natural medicine.
                  </Typography>
                </CardContent>
              </Card>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default OurStorySection;
