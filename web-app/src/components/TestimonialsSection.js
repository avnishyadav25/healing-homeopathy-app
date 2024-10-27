// src/components/TestimonialsSection.js

import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Slide, Fade, Zoom } from '@mui/material';

import customerImage1 from '../assets/customer1.jpg';
import customerImage2 from '../assets/customer1.jpg';
import customerImage3 from '../assets/customer1.jpg';
import customerImage4 from '../assets/customer1.jpg';
import customerImage5 from '../assets/customer1.jpg';
import customerImage6 from '../assets/customer1.jpg';

const testimonials = [
  {
    name: "John Doe",
    feedback: "I had been struggling with chronic migraines for years, but after a personalized consultation with Healing Homoeopathy, I finally found relief. The natural remedies and caring approach made all the difference.",
    image: customerImage1,
  },
  {
    name: "Jane Smith",
    feedback: "Healing Homoeopathy has transformed my life. Their holistic approach helped me overcome anxiety and stress in a way that conventional medicine never could.",
    image: customerImage2,
  },
  {
    name: "Michael Johnson",
    feedback: "The team at Healing Homoeopathy is fantastic! Their personalized care and attention to detail ensured I received the best treatment possible for my chronic condition.",
    image: customerImage3,
  },
  {
    name: "Emily Davis",
    feedback: "After years of battling with digestive issues, I finally found a solution with Healing Homoeopathy. Their natural remedies worked wonders, and I feel healthier than ever.",
    image: customerImage4,
  },
  {
    name: "Chris Lee",
    feedback: "I was skeptical about homeopathy at first, but the results speak for themselves. Healing Homoeopathy's approach to treating the whole person really works.",
    image: customerImage5,
  },
  {
    name: "Sarah Wilson",
    feedback: "The personalized care I received from Healing Homoeopathy was unparalleled. They truly listened to my concerns and tailored a treatment plan that worked for me.",
    image: customerImage6,
  },
];

const TestimonialsSection = () => {
  return (
    <Container
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Fade in timeout={1000}>
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4" color="text.primary">
            What Our Patients Say
          </Typography>
          <Typography variant="body1" color="text.secondary">
            See how our patients have benefited from our holistic approach to homeopathy. Their stories reflect the positive impact of personalized care and natural remedies.
          </Typography>
        </Box>
      </Fade>
      <Grid container spacing={2}>
        {testimonials.slice(0, 6).map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <Slide direction="up" in timeout={1000 + index * 200}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                  p: 1,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    "{testimonial.feedback}"
                  </Typography>
                </CardContent>
                <Zoom in timeout={1000 + index * 200}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      p: 2,
                    }}
                  >
                    <Avatar
                      src={testimonial.image}
                      alt={testimonial.name}
                      sx={{ mr: 2 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" color="text.primary">
                        {testimonial.name}
                      </Typography>
                    </Box>
                  </Box>
                </Zoom>
              </Card>
            </Slide>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button variant="contained" color="primary" href="/testimonials">
          View All Testimonials
        </Button>
      </Box>
    </Container>
  );
};

export default TestimonialsSection;
