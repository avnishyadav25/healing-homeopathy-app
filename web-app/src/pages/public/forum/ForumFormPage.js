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
          title="Welcome to Healing Homoeopathy's Forum" 
          subtitle="At Healing Homoeopathy, we believe in the power of nature to heal. Our practice is dedicated to providing personalized homeopathic treatments that address the root cause of your health concerns. With a focus on holistic wellness, we offer natural remedies that are tailored to your individual needs, helping you achieve a balanced and healthy life." 
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
