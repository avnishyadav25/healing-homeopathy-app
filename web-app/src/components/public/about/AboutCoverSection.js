// src/components/AboutCoverSection.js

import React from 'react';
import CoverSection from '../common/CoverSection'; // Ensure this path is correct
import aboutCoverImage from '../../../assets/about-cover.jpg'; // Ensure you have an appropriate image

const AboutCoverSection = () => {
  const buttons = [
    {
      text: "Get in Touch",
      variant: "contained",
      color: "success",
      link: "/contact",
    },
  ];

  return (
    <CoverSection
      title="About Us - Healing Homoeopathy"
      subtitle="Welcome to Healing Homoeopathy, where we blend traditional wisdom with modern healthcare to offer holistic solutions for your well-being. Our mission is to empower individuals and families to achieve optimal health through natural and personalized homeopathic treatments."
      image={aboutCoverImage}
      buttons={buttons}
    />
  );
};

export default AboutCoverSection;
