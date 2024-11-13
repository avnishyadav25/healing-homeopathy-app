// src/pages/forum/ForumListPage.js
import React from 'react';
import { Container, Box } from '@mui/material';
import ForumList from '../../../components/public/forum/ForumList';
import Template from '../../../components/common/Template';
import CoverSection from '../../../components/public/common/CoverSection';
import forumBackgroundImage from '../../../assets/forum-background.jpg'; // Example background image path
import AuthProvider from '../../../contexts/AuthContext';



const ForumListPage = () => (
  <Template>
    <AuthProvider>
    <CoverSection 
        title="Welcome to Healing Homoeopathy' Forum" 
        subtitle="Dive into our community of natural healing! Explore homeopathic insights, share experiences, and connect with others on the journey to balanced wellness. Join us and discover the power of holistic health!" 
        image={forumBackgroundImage}
      />
      <Container maxWidth="xl" sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2, p: 4 }}>
        <ForumList />
      </Container>
    </AuthProvider>
    
  </Template>
);

export default ForumListPage;
