// src/pages/forum/ForumDetailPage.js
import React from 'react';
import { Container, Box } from '@mui/material';
import ForumDetail from '../../components/forum/ForumDetail';
import Template from '../../components/common/Template';
import homepageCoverImage from '../../assets/homepage-cover.jpg';

const ForumDetailPage = () => (
  <Template>
    <Box
      sx={{
        backgroundImage: `url(${homepageCoverImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        py: 4,
      }}
    >
      <Container maxWidth="md" sx={{ mt: '150px', bgcolor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2, p: 4 }}>
        <ForumDetail />
      </Container>
    </Box>
  </Template>
);

export default ForumDetailPage;
