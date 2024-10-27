// src/pages/PersonalizedConsultation.js

import React from 'react';
import ServicePageTemplate from './ServicePageTemplate';
import personalizedConsultationImage from '../../assets/consultation.jpg';

const PersonalizedConsultation = () => {
  const title = "Personalized Consultation";
  const description = "Our personalized consultation service is designed to address your unique health needs. We take the time to understand your individual concerns and tailor a treatment plan that is specific to you.";
  const benefits = [
    "Tailored treatment plans",
    "One-on-one consultation with an expert",
    "Holistic approach considering your entire well-being",
    "Ongoing support and follow-up care"
  ];
  const buttonText = "Book a Consultation";
  const buttonLink = "/contact";

  return (
    <ServicePageTemplate
      title={title}
      image={personalizedConsultationImage}
      description={description}
      benefits={benefits}
      buttonText={buttonText}
      buttonLink={buttonLink}
    />
  );
};

export default PersonalizedConsultation;
