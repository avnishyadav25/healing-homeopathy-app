// src/components/MissionStatementSection.js

import React from 'react';
import { Box, Container, Grid, Typography, Fade, Slide, Zoom } from '@mui/material';
import missionImage from '../../../assets/mission-image.jpg'; // Ensure you have an appropriate image

const MissionStatementSection = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container>
        <Fade in timeout={1000}>
          <Typography variant="h4" align="center" gutterBottom>
            Our Mission
          </Typography>
        </Fade>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Slide direction="left" in timeout={1500}>
              <Box>
                <Typography variant="h5" gutterBottom>
                  Our Commitment to You
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Our mission at Healing Homoeopathy is to provide safe, effective, and natural healthcare solutions tailored to the unique needs of each individual. We are committed to promoting the holistic principles of Homoeopathy, focusing on the whole person rather than just symptoms.
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We believe in treating the root cause of illness, offering personalized care that addresses the physical, emotional, and mental aspects of health. Our goal is to empower you to achieve optimal well-being through natural, non-invasive treatments that work in harmony with your body’s own healing processes.
                </Typography>
              </Box>
            </Slide>
          </Grid>
          <Grid item xs={12} md={6}>
            <Zoom in timeout={2000}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  component="img"
                  src={missionImage}
                  alt="Our Mission"
                  sx={{
                    maxWidth: '100%',
                    borderRadius: '8px',
                    boxShadow: (theme) => theme.shadows[4],
                  }}
                />
              </Box>
            </Zoom>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MissionStatementSection;
