// src/pages/FamilyWellness.js

import React from 'react';
import ServicePageTemplate from '../ServicePageTemplate';
import familyWellnessImage from '../../assets/wellness.jpg';

const FamilyWellness = () => {
  const title = "Family Wellness";
  const description = "Our Family Wellness service provides comprehensive homeopathic care for every member of your family. From children to seniors, we offer personalized treatments that promote overall health and prevent illness.";
  const benefits = [
    "Comprehensive care for all family members",
    "Preventative treatments to maintain health",
    "Safe and effective for all ages",
    "Personalized plans for each individual"
  ];
  const buttonText = "Learn More About Family Wellness";
  const buttonLink = "/contact";

  return (
    <ServicePageTemplate
      title={title}
      image={familyWellnessImage}
      description={description}
      benefits={benefits}
      buttonText={buttonText}
      buttonLink={buttonLink}
    />
  );
};

export default FamilyWellness;
