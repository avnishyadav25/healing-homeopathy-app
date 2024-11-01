// src/pages/ImmuneBoosting.js

import React from 'react';
import ServicePageTemplate from '../ServicePageTemplate';
import immuneBoostingImage from '../../assets/immune.jpg';

const ImmuneBoosting = () => {
  const title = "Immune Boosting";
  const description = "Boost your immune system naturally with our specialized homeopathic treatments. Our Immune Boosting service strengthens your body's defenses, helping you stay healthy and resilient against illness.";
  const benefits = [
    "Strengthens the immune system naturally",
    "Helps prevent illness and infections",
    "Supports overall health and vitality",
    "Personalized treatment plans for optimal results"
  ];
  const buttonText = "Boost Your Immune System";
  const buttonLink = "/contact";

  return (
    <ServicePageTemplate
      title={title}
      image={immuneBoostingImage}
      description={description}
      benefits={benefits}
      buttonText={buttonText}
      buttonLink={buttonLink}
    />
  );
};

export default ImmuneBoosting;
