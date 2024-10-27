


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
import personalizedConsultationImage from '../assets/consultation.jpg';
import naturalRemediesImage from '../assets/remedies.jpg';
import familyWellnessImage from '../assets/wellness.jpg';
import chronicConditionImage from '../assets/chronic.jpg';
import mentalWellbeingImage from '../assets/mental.jpg';
import immuneBoostingImage from '../assets/immune.jpg';
import medicineDeliveryImage from '../assets/delivery.jpg';

const services = [
  {
    title: "Personalized Consultation",
    image: personalizedConsultationImage,
    description: "Our personalized consultations are designed to address your unique health needs with tailored treatment plans, offering in-depth medical history analysis and holistic health approaches.",
    link: "/services/personalized-consultation",
    patients: 1200,
    details: [
      "Tailored treatment plans.",
      "One-on-one consultations.",
      "Comprehensive health assessments.",
      "Personalized follow-up care.",
      "Customized dietary and lifestyle advice.",
      "Holistic health approach.",
      "In-depth medical history analysis.",
      "Regular monitoring and adjustment of treatment.",
      "Focus on root cause of symptoms.",
      "Support for chronic conditions.",
      "Integration with other healthcare providers.",
      "Privacy and confidentiality ensured.",
    ],
  },
  {
    title: "Natural Remedies",
    image: naturalRemediesImage,
    description: "Explore our range of natural remedies, ethically sourced and free from artificial additives, to support your well-being through non-invasive, safe, and effective treatments.",
    link: "/services/natural-remedies",
    patients: 980,
    details: [
      "Wide range of natural products.",
      "Support for various health issues.",
      "No artificial additives.",
      "Non-invasive treatments.",
      "Safe for long-term use.",
      "Ethically sourced ingredients.",
      "Environmentally friendly products.",
      "No side effects.",
      "Suitable for all ages.",
      "Support for immune system.",
      "Complementary to other treatments.",
      "Trusted by health professionals.",
    ],
  },
  {
    title: "Family Wellness",
    image: familyWellnessImage,
    description: "Our family wellness services provide comprehensive homeopathic care for all ages, promoting long-term health and wellness through preventive care and holistic treatments.",
    link: "/services/family-wellness",
    patients: 800,
    details: [
      "Care for all family members.",
      "Preventative healthcare.",
      "Support for children and adults.",
      "Treatment for common ailments.",
      "Family-focused consultations.",
      "Education on health and wellness.",
      "Personalized treatment plans.",
      "Long-term health management.",
      "Support for chronic conditions.",
      "Holistic family care.",
      "Safe for all ages.",
      "Focus on overall family health.",
    ],
  },
  {
    title: "Chronic Condition",
    image: chronicConditionImage,
    description: "We specialize in treating chronic conditions with a focus on long-term management and holistic care, aiming to improve your quality of life with personalized treatment plans.",
    link: "/services/chronic-condition",
    patients: 670,
    details: [
      "Specialized in chronic conditions.",
      "Long-term management.",
      "Root cause treatment.",
      "Personalized care plans.",
      "Regular monitoring.",
      "Holistic approach.",
      "Support for co-existing conditions.",
      "Non-invasive treatments.",
      "Focus on quality of life.",
      "Integration with other healthcare providers.",
      "Safe and effective.",
      "Ongoing patient education.",
    ],
  },
  {
    title: "Mental Well-being",
    image: mentalWellbeingImage,
    description: "Our mental well-being services use natural remedies and holistic approaches to support your emotional and mental health, providing personalized care for lasting results.",
    link: "/services/mental-wellbeing",
    patients: 540,
    details: [
      "Holistic mental health care.",
      "Support for anxiety and depression.",
      "Natural remedies for stress.",
      "Personalized treatment plans.",
      "Focus on mental and emotional well-being.",
      "Support for chronic mental health issues.",
      "No side effects.",
      "Safe for long-term use.",
      "Integration with other mental health treatments.",
      "Support for sleep disorders.",
      "Caring and compassionate approach.",
      "Ongoing monitoring and support.",
    ],
  },
  {
    title: "Immune Boosting",
    image: immuneBoostingImage,
    description: "Our immune-boosting treatments are designed to strengthen your immune system naturally, helping you maintain optimal health through safe and effective remedies.",
    link: "/services/immune-boosting",
    patients: 860,
    details: [
      "Boost your immune system naturally.",
      "Support for overall health.",
      "Personalized immune-boosting plans.",
      "Safe and effective remedies.",
      "No artificial ingredients.",
      "Holistic approach to immunity.",
      "Support for chronic immune conditions.",
      "Preventative care.",
      "Support for recovery from illness.",
      "Education on immune health.",
      "Complementary to other treatments.",
      "Trusted by health professionals.",
    ],
  },
  {
    title: "Medicine Delivery",
    image: medicineDeliveryImage,
    description: "Our fast and reliable medicine delivery service ensures that your homeopathic treatments reach you safely and on time, with convenient online ordering and professional handling.",
    link: "/services/medicine-delivery",
    patients: 1500,
    details: [
      "Fast delivery service.",
      "Reliable and safe.",
      "Wide range of homeopathic medicines.",
      "Convenient online ordering.",
      "Delivery to your doorstep.",
      "Professional handling of medicines.",
      "Safe packaging.",
      "Timely delivery.",
      "Order tracking available.",
      "Support for urgent needs.",
      "Affordable delivery options.",
      "Trusted by thousands of customers.",
    ],
  },
];

const apiUrl = process.env.REACT_APP_API_URL;


const FeatureSection = () => {
  const [services, setServices] = useState([]);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(apiUrl+'/services');
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
                backgroundImage: `url(${services[selectedServiceIndex].image})`,
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