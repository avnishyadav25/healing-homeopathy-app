// src/pages/ServicesPage.js

import React from 'react';
import NavigationBar from '../../components/common/NavigationBar';
import CoverSection from '../../components/CoverSection';
import FeatureSection from '../../components/FeatureSection';
import NewsletterSection from '../../components/NewsletterSection';
import ContactUsSection from '../../components/ContactUsSection';
import servicesCoverImage from '../../assets/services-cover.jpg'; // Ensure you have an appropriate image
import SectionDivider from '../../components/SectionDivider';
import Template from '../../components/common/Template';


const ServicesPage = () => {
  return (
    <div>
      <Template>
      <CoverSection 
        title="Welcome to Our Services" 
        subtitle="Explore our wide range of homeopathic services tailored to meet your health needs." 
        image={servicesCoverImage} 
      />
      <div className="services-section py-5">
        <FeatureSection />
      </div>
      <NewsletterSection />
      <ContactUsSection />
      <SectionDivider color="#004d40" thickness="3px" margin="40px 0" />
      </Template>
    </div>
  );
};

export default ServicesPage;
