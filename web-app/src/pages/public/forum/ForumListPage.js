// src/pages/forum/ForumListPage.js
import React from 'react';
import { Container, Box } from '@mui/material';
import ForumList from '../../../components/public/forum/ForumList';
import Template from '../../../components/common/Template';
import CoverSection from '../../../components/public/common/CoverSection';
import homepageCoverImage from '../../../assets/homepage-cover.jpg'; // Import the background image

const ForumListPage = () => (
  <Template>
    <CoverSection 
        title="Welcome to Healing Homoeopathy' Blogs" 
        subtitle="At Healing Homoeopathy, we believe in the power of nature to heal. Our practice is dedicated to providing personalized homeopathic treatments that address the root cause of your health concerns. With a focus on holistic wellness, we offer natural remedies that are tailored to your individual needs, helping you achieve a balanced and healthy life." 
        image={homepageCoverImage}
      />
      <Container maxWidth="md" sx={{ mt: '150px', bgcolor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2, p: 4 }}>
        <ForumList />
      </Container>
  </Template>
);

export default ForumListPage;