


// src/components/FeatureSection.js

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Slide, Fade, Zoom } from '@mui/material';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;


const FeatureSection = () => {
  const [services, setServices] = useState([]);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(apiUrl+'/services');
        console.log('### services = ',response.data);
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services', error);
      }
    };
    fetchServices();
  }, []);

  const handleServiceClick = (index) => {
    setSelectedServiceIndex(index);
  };

  if (services.length === 0) return <Typography>Loading services...</Typography>;

  return (
    <Container sx={{ py: { xs: 8, sm: 16 } }}>
      <Fade in timeout={1000}>
        <Typography component="h2" variant="h4" color="text.primary" align="center" sx={{ mb: 5 }}>
          Our Services
        </Typography>
      </Fade>
      <Grid container spacing={4}>
        {/* Left Column: List of Services */}
        <Grid item xs={12} md={4}>
          {services.map((service, index) => (
            <Slide direction="up" in timeout={1000 + index * 200} key={service._id}>
              <Card
                variant="outlined"
                onClick={() => handleServiceClick(index)}
                sx={{
                  p: 2,
                  mb: 2,
                  border: selectedServiceIndex === index ? '2px solid' : '1px solid',
                  borderColor: selectedServiceIndex === index ? 'primary.main' : 'grey.300',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    transform: 'scale(1.05)',
                  },
                  transition: 'transform 0.3s ease-in-out',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PersonIcon sx={{ mr: 2, color: selectedServiceIndex === index ? 'primary.main' : 'text.secondary' }} />
                  <Typography variant="h6" color="text.primary">
                    {service.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ my: 2 }}>
                  {service.description}
                </Typography>
                <Link
                  href={service.link}
                  color="primary"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    '& > svg': { transition: '0.2s' },
                    '&:hover > svg': { transform: 'translateX(2px)' },
                  }}
                >
                  Learn More <ChevronRightRoundedIcon sx={{ ml: 1 }} />
                </Link>
              </Card>
            </Slide>
          ))}
        </Grid>
        {/* Right Column: Selected Service Image and Details */}
        <Grid item xs={12} md={8}>
          <Zoom in timeout={1000}>
            <Box
              sx={{
                width: '100%',
                height: { xs: 200, sm: 400 },
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${new URL(services[selectedServiceIndex].image, apiUrl).href})`,
                borderRadius: 2,
                boxShadow: 3,
                mb: 4,
              }}
            />
          </Zoom>
          <Fade in timeout={1200}>
            <Box>
              <Typography variant="h5" color="text.primary" sx={{ mb: 2 }}>
                {services[selectedServiceIndex].title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                {services[selectedServiceIndex].description}
              </Typography>
              
              <List>
                {services[selectedServiceIndex].details.map((detail, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={detail} />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                color="primary"
                href="/book-appointment"
                sx={{ mt: 4 }}
              >
                Book an Appointment
              </Button>
            </Box>
          </Fade>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FeatureSection;