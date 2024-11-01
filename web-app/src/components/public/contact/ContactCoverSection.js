// src/components/ContactCoverSection.js

import React from 'react';
import CoverSection from './../common/CoverSection';
import contactCoverImage from '../../../assets/contact-cover.jpg'; // Ensure you have an appropriate image

const ContactCoverSection = () => {
  return (
    <CoverSection
      title="Get in Touch"
      subtitle="We're here to help. Reach out to us with any questions or to book a consultation."
      image={contactCoverImage}
      buttons={[]} // No buttons needed for the contact cover section
    />
  );
};

export default ContactCoverSection;
