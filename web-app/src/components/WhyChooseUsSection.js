// src/components/WhyChooseUsSection.js

import React from 'react';
import { Box, Container, Grid, Typography, ListItemText, ListItemIcon, Slide, Fade, Zoom } from '@mui/material';
import HealingIcon from '@mui/icons-material/Healing';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import SupportIcon from '@mui/icons-material/Support';

const whyChooseUsPoints = [
  {
    title: "Personalized Care",
    description: "Our personalized approach and commitment to natural healing make us the trusted choice for comprehensive care.",
    icon: <HealingIcon />,
  },
  {
    title: "Treating Root Causes",
    description: "We treat the root cause, not just the symptoms, ensuring long-lasting health and well-being.",
    icon: <NaturePeopleIcon />,
  },
  {
    title: "Comprehensive Understanding",
    description: "We craft tailored treatments that address both physical and emotional needs, ensuring a holistic approach to health.",
    icon: <SupportIcon />,
  },
  {
    title: "Integrating Tradition and Innovation",
    description: "We combine traditional homeopathic practices with the latest advancements in natural medicine.",
    icon: <HealingIcon />,
  },
  {
    title: "Patient Empowerment",
    description: "We empower our patients with knowledge and support throughout their healing journey.",
    icon: <SupportIcon />,
  },
  {
    title: "Patient Safety First",
    description: "We prioritize your safety, using only certified and tested remedies that adhere to the highest standards.",
    icon: <SupportIcon />,
  },
];

const WhyChooseUsSection = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'black', color: 'white' }}>
      <Container>
        <Fade in timeout={1000}>
          <Typography variant="h4" align="center" gutterBottom>
            Why Choose Us? / Our Approach
          </Typography>
        </Fade>
        <Fade in timeout={1500}>
          <Typography variant="body1" align="center" sx={{ mb: 4 }}>
            Discover the reasons why we are trusted by so many. Our approach is centered on personalized, holistic care that blends traditional and modern practices.
          </Typography>
        </Fade>
        <Grid container spacing={4}>
          {whyChooseUsPoints.map((point, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Slide direction="up" in timeout={1000 + index * 200}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    bgcolor: '#333',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Zoom in timeout={1000 + index * 200}>
                    <ListItemIcon sx={{ color: 'primary.main', mb: 2 }}>
                      {point.icon}
                    </ListItemIcon>
                  </Zoom>
                  <Typography variant="h6" color="white" gutterBottom>
                    {point.title}
                  </Typography>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'body2',
                      color: 'text.main',
                    }}
                  >
                    {point.description}
                  </ListItemText>
                </Box>
              </Slide>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyChooseUsSection;
