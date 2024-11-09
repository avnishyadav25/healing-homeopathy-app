// src/pages/forum/ForumFormPage.js
import React from 'react';
import { Container, Box } from '@mui/material';
import Template from '../../../components/common/Template';
import ForumForm from '../../../components/public/forum/ForumForm';
import forumBackgroundImage from '../../../assets/forum-background.jpg';
import CoverSection from '../../../components/public/common/CoverSection';
import AuthProvider from '../../../contexts/AuthContext';

const ForumFormPage = () => {
  return (
    <Template>
      <AuthProvider>
        <CoverSection 
          title="Welcome to the Healing Homoeopathy Forum" 
          subtitle="Dive into our community of natural healing! Explore homeopathic insights, share experiences, and connect with others on the journey to balanced wellness. Join us and discover the power of holistic health!" 
          image={forumBackgroundImage}
        />
        <Container maxWidth="xl" sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2, p: 4 }}>
          <ForumForm />
        </Container>
      </AuthProvider>
    </Template>
  );
};

export default ForumFormPage;
