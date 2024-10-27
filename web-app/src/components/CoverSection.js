// src/components/CoverSection.js

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';
import Slide from '@mui/material/Slide';

const CoverSection = ({ title, subtitle, image, buttons = [] }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay to darken the background image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darken the image with an overlay
          zIndex: 1,
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Fade in timeout={1000}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: '3rem',
              fontWeight: 'bold',
              mb: 2,
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)', // Add text shadow for better readability
            }}
          >
            {title}
          </Typography>
        </Fade>
        <Fade in timeout={1500}>
          <Typography
            variant="h5"
            component="p"
            sx={{
              mb: 4,
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)', // Add text shadow for better readability
            }}
          >
            {subtitle}
          </Typography>
        </Fade>
        <Slide direction="up" in timeout={2000}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {buttons.map((button, index) => (
              <Zoom in timeout={2500 + index * 500} key={index}>
                <Button
                  variant={button.variant || 'contained'}
                  href={button.link}
                  color="primary"
                  sx={{
                    backgroundColor: button.color || 'primary.main',
                    color: '#fff',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    px: 3,
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: button.color
                        ? `${button.color}.dark`
                        : 'primary.dark',
                    },
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', // Add button shadow
                    borderRadius: 2,
                  }}
                >
                  {button.text}
                </Button>
              </Zoom>
            ))}
          </Stack>
        </Slide>
      </Container>
    </Box>
  );
};

export default CoverSection;
