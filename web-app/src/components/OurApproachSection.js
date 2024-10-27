import React from 'react';
import { Box, Container, Grid, Typography, Fade, Slide, Card, CardMedia, CardContent } from '@mui/material';
import approachImage from '../assets/approach-image.jpg'; // Ensure the path is correct

const OurApproachSection = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default', color: 'text.primary' }}>
      <Container>
        <Fade in timeout={1000}>
          <Typography variant="h4" align="center" gutterBottom>
            Our Approach/Philosophy
          </Typography>
        </Fade>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Slide direction="left" in timeout={1500}>
              <Card sx={{ bgcolor: 'background.paper', boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  alt="Our Approach"
                  height="400"
                  image={approachImage}
                  sx={{ borderRadius: 1 }}
                />
              </Card>
            </Slide>
          </Grid>
          <Grid item xs={12} md={6}>
            <Slide direction="right" in timeout={1500}>
              <Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  Our Unique Approach to Healthcare
                </Typography>
                <Typography variant="body1" paragraph>
                  At Healing Homoeopathy, we believe in treating the root cause of illness rather than just addressing symptoms. Our personalized approach considers your physical, emotional, and mental well-being, ensuring comprehensive care that aligns with your individual needs.
                </Typography>
                <Typography variant="body1" paragraph>
                  We take the time to understand your unique health concerns and goals. By integrating traditional homeopathic principles with modern scientific insights, we create tailored treatment plans that promote holistic healing. Our methods are designed to support your body’s natural ability to heal, focusing on long-term wellness rather than temporary relief.
                </Typography>
                <Typography variant="body1" paragraph>
                  Our approach involves a deep commitment to understanding the intricate balance between the body, mind, and spirit. We emphasize the importance of prevention, encouraging lifestyle changes and wellness practices that contribute to overall health. By fostering a partnership with our patients, we empower them to take an active role in their healing journey.
                </Typography>
                <Typography variant="body1">
                  Whether you are dealing with a chronic condition or seeking to enhance your well-being, our holistic approach is designed to provide personalized care that supports sustainable health and vitality.
                </Typography>
              </Box>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default OurApproachSection;
