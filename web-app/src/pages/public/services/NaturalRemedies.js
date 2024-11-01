// src/pages/NaturalRemedies.js

import React from 'react';
import ServicePageTemplate from '../ServicePageTemplate';
import naturalRemediesImage from '../../assets/remedies.jpg';

const NaturalRemedies = () => {
  const title = "Natural Remedies";
  const description = "Our natural remedies are designed to support your health with the power of nature. We offer a wide range of homeopathic solutions tailored to your individual needs, promoting healing without the side effects of conventional medicine.";
  const benefits = [
    "Gentle on the body with no side effects",
    "Effective treatment for a variety of conditions",
    "Personalized remedies tailored to individual needs",
    "Support for long-term health and wellness"
  ];
  const buttonText = "Explore Natural Remedies";
  const buttonLink = "/contact";

  return (
    <ServicePageTemplate
      title={title}
      image={naturalRemediesImage}
      description={description}
      benefits={benefits}
      buttonText={buttonText}
      buttonLink={buttonLink}
    />
  );
};

export default NaturalRemedies;
