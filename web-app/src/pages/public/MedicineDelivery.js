// src/pages/MedicineDelivery.js

import React from 'react';
import ServicePageTemplate from './ServicePageTemplate';
import medicineDeliveryImage from '../../assets/delivery.jpg';

const MedicineDelivery = () => {
  const title = "Medicine Delivery";
  const description = "Our Medicine Delivery service ensures that you receive your homeopathic treatments promptly and conveniently. We offer fast and reliable delivery of all our natural remedies right to your doorstep.";
  const benefits = [
    "Fast and reliable delivery",
    "Convenient service right to your doorstep",
    "Access to a wide range of homeopathic remedies",
    "Ensures timely treatment for ongoing care"
  ];
  const buttonText = "Order Your Medicine";
  const buttonLink = "/contact";

  return (
    <ServicePageTemplate
      title={title}
      image={medicineDeliveryImage}
      description={description}
      benefits={benefits}
      buttonText={buttonText}
      buttonLink={buttonLink}
    />
  );
};

export default MedicineDelivery;
