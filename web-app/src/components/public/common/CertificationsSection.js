import React from 'react';
import { Box, Container, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import certificationImage1 from '../../../assets/certification1.jpg';
import certificationImage2 from '../../../assets/certification1.jpg';
import certificationImage3 from '../../../assets/certification1.jpg';
import certificationImage4 from '../../../assets/certification1.jpg';
import certificationImage5 from '../../../assets/certification1.jpg';
import certificationImage6 from '../../../assets/certification1.jpg';
import certificationImage7 from '../../../assets/certification1.jpg';
import certificationImage8 from '../../../assets/certification1.jpg';

const certifications = [
  {
    name: "Certified Member of the Homeopathic Medical Association",
    image: certificationImage1,
    details: "Recognized as a trusted practitioner by the Homeopathic Medical Association.",
  },
  {
    name: "Awarded Best Homoeopathy Practice 2024",
    image: certificationImage2,
    details: "Awarded for outstanding contributions to the field of Homoeopathy.",
  },
  {
    name: "Licensed Practitioner by the National Council for Homeopathic Medicine",
    image: certificationImage3,
    details: "Licensed by the National Council, ensuring adherence to high standards of practice.",
  },
  {
    name: "Accredited by the International Association of Homeopathic Professionals",
    image: certificationImage4,
    details: "Accredited for professional excellence and commitment to patient care.",
  },
  {
    name: "Recipient of the Excellence in Homoeopathy Award 2023",
    image: certificationImage5,
    details: "Honored with the Excellence in Homoeopathy Award for innovative treatments.",
  },
  {
    name: "Affiliated with the Global Homoeopathy Network",
    image: certificationImage6,
    details: "Connected with a global network of Homoeopathy professionals.",
  },
  {
    name: "Certified in Advanced Homeopathic Therapeutics",
    image: certificationImage7,
    details: "Specialized certification in advanced therapeutic techniques in Homoeopathy.",
  },
  {
    name: "Member of the World Federation of Homoeopathy",
    image: certificationImage8,
    details: "A proud member of the World Federation, promoting global homeopathic practices.",
  },
];

const CertificationsSection = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default', color: 'text.primary' }}>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Certifications & Affiliations
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {certifications.map((certification, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', bgcolor: 'background.paper', boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={certification.image}
                  alt={certification.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {certification.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {certification.details}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CertificationsSection;
