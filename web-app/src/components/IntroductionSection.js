// src/components/IntroductionSection.js

import React from 'react';
import { Container } from 'react-bootstrap';

const IntroductionSection = () => {
  return (
    <div className="introduction-section py-5">
      <Container className="text-center">
        <h2>Welcome to Healing Homoeopathy</h2>
        <p className="lead mt-3">
          At Healing Homoeopathy, we believe in the power of nature to heal. Our practice is dedicated to providing personalized homeopathic treatments that address the root cause of your health concerns. With a focus on holistic wellness, we offer natural remedies that are tailored to your individual needs, helping you achieve a balanced and healthy life.
        </p>
      </Container>
    </div>
  );
};

export default IntroductionSection;
