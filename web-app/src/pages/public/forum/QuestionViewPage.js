// src/pages/forum/QuestionViewPage.js
import React from 'react';
import { Box } from '@mui/material';
import Template from '../../../components/common/Template';
import CoverSection from '../../../components/public/common/CoverSection';
import forumBackgroundImage from '../../../assets/forum-background.jpg';
import AuthProvider from '../../../contexts/AuthContext';
import QuestionView from '../../../components/public/forum/QuestionView';

const QuestionViewPage = () => (
  <Template>
    <AuthProvider>
      <CoverSection 
        title="Welcome to Healing Homoeopathy' Forum" 
        subtitle="At Healing Homoeopathy, we believe in the power of nature to heal. Our practice is dedicated to providing personalized homeopathic treatments that address the root cause of your health concerns. With a focus on holistic wellness, we offer natural remedies that are tailored to your individual needs, helping you achieve a balanced and healthy life." 
        image={forumBackgroundImage}
      />
      <Box sx={{ p: 4 }}>
        <QuestionView />
      </Box>
    </AuthProvider>
  </Template>
);

export default QuestionViewPage;
