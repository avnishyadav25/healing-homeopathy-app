import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, CardMedia, CardActionArea, Slide } from '@mui/material';
import teamMember1 from '../../../assets/team-member1.jpg';
import teamMember2 from '../../../assets/team-member1.jpg';
import teamMember3 from '../../../assets/team-member1.jpg';
import teamMember4 from '../../../assets/team-member1.jpg'; // Ensure you have an appropriate image

const teamMembers = [
  {
    name: "Dr. Aparna Singh",
    designation: "Founder & Lead Practitioner",
    image: teamMember1,
    description: "With over 4 years of experience in Homoeopathy, Dr. Aparna Singh is dedicated to providing personalized care and holistic treatment to all her patients.",
  },
  {
    name: "Dr. John Doe",
    designation: "Homeopathic Consultant",
    image: teamMember2,
    description: "Dr. John Doe specializes in chronic conditions and has a passion for helping patients achieve long-term wellness through natural remedies.",
  },
  {
    name: "Jane Smith",
    designation: "Patient Care Coordinator",
    image: teamMember3,
    description: "Jane ensures that every patient receives the attention and care they deserve, guiding them through their treatment journey with compassion and expertise.",
  },
  {
    name: "Dr. Emily Johnson",
    designation: "Homeopathic Specialist",
    image: teamMember4,
    description: "Dr. Emily Johnson has a deep understanding of holistic medicine and is committed to promoting health through natural methods.",
  },
];

const OurTeamSection = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'black', color: 'white' }}>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Our Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Slide direction="up" in timeout={500 + index * 300}>
                <Card sx={{ bgcolor: '#333', color: 'white', '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.3s ease-in-out' } }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="300"
                      image={member.image}
                      alt={member.name}
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {member.name}
                      </Typography>
                      <Typography variant="body1" color="primary.main" sx={{ mb: 1 }}>
                        {member.designation}
                      </Typography>
                      <Typography variant="body2" color="text.main">
                        {member.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Slide>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default OurTeamSection;
