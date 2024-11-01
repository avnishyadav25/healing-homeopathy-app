// src/pages/MentalWellbeing.js

import React from 'react';
import ServicePageTemplate from '../ServicePageTemplate';
import mentalWellbeingImage from '../../assets/mental.jpg';

const MentalWellbeing = () => {
  const title = "Mental Well-being";
  const description = "Our Mental Well-being service offers natural treatments for mental health issues, helping you achieve emotional balance and mental clarity. We address the underlying causes of stress, anxiety, and depression with gentle, effective remedies.";
  const benefits = [
    "Natural treatments for stress, anxiety, and depression",
    "Supports emotional balance and mental clarity",
    "Addresses underlying causes of mental health issues",
    "Personalized care tailored to your needs"
  ];
  const buttonText = "Improve Your Mental Well-being";
  const buttonLink = "/contact";

  return (
    <ServicePageTemplate
      title={title}
      image={mentalWellbeingImage}
      description={description}
      benefits={benefits}
      buttonText={buttonText}
      buttonLink={buttonLink}
    />
  );
};

export default MentalWellbeing;
