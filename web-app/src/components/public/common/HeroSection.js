// src/components/HeroSection.js

import React from 'react';
import { alpha, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import heroImage from '../../../assets/hero-image.jpg'; // Ensure the path to the hero image is correct
import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';
import Slide from '@mui/material/Slide';

const HeroSection = () => {
  const theme = useTheme();

  return (
    <Box
      id="hero"
      sx={{
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          pt: { xs: 10, sm: 12 },
          pb: { xs: 8, sm: 10 },
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Fade in timeout={1000}>
            <Typography
              variant="h2"
              sx={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                mb: 2,
              }}
            >
              Get One-to-One Consultation
            </Typography>
          </Fade>
          <Fade in timeout={1500}>
            <Typography
              variant="h4"
              sx={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: 500,
                color: 'primary.main',
                mb: 3,
              }}
            >
              and Get Medicine at Your Doorstep
            </Typography>
          </Fade>
          <Fade in timeout={2000}>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                maxWidth: '80%',
                color: 'text.secondary',
              }}
            >
              Experience personalized homeopathic treatment plans tailored to your specific needs. Conveniently order your prescribed medicines and have them delivered to your doorstep.
            </Typography>
          </Fade>
          <Zoom in timeout={2500}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" href="/book-appointment">
                Book an Appointment
              </Button>
              <Button variant="contained" color="success" href="/order-medicine">
                Order Medicine
              </Button>
            </Box>
          </Zoom>
        </Box>

        <Slide direction="right" in timeout={3000}>
          <Box
            sx={{
              width: { xs: '100%', md: '50%' },
              mt: { xs: 4, md: 0 },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              component="img"
              src={heroImage}
              alt="Healing Homoeopathy"
              sx={{
                width: '100%',
                maxHeight: { xs: 200, sm: 400 },
                borderRadius: '10px',
                boxShadow: theme =>
                  theme.palette.mode === 'light'
                    ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                    : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
              }}
            />
          </Box>
        </Slide>
      </Container>
    </Box>
  );
};

export default HeroSection;
