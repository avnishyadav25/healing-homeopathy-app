// src/pages/ChronicCondition.js

import React from 'react';
import ServicePageTemplate from './ServicePageTemplate';
import chronicConditionImage from '../../assets/chronic.jpg';

const ChronicCondition = () => {
  const title = "Chronic Condition";
  const description = "Our Chronic Condition service is dedicated to managing long-term health issues with natural and effective treatments. We focus on the root causes of chronic diseases, providing relief and improving your quality of life.";
  const benefits = [
    "Effective management of chronic diseases",
    "Holistic approach addressing root causes",
    "Long-term relief and improved quality of life",
    "Personalized treatment plans"
  ];
  const buttonText = "Get Help for Chronic Conditions";
  const buttonLink = "/contact";

  return (
    <ServicePageTemplate
      title={title}
      image={chronicConditionImage}
      description={description}
      benefits={benefits}
      buttonText={buttonText}
      buttonLink={buttonLink}
    />
  );
};

export default ChronicCondition;
