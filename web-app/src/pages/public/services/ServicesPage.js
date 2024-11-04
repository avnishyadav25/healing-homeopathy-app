// src/pages/ServicesPage.js

import React from 'react';
import NavigationBar from '../../../components/common/NavigationBar';
import CoverSection from '../../../components/public/common/CoverSection';
import FeatureSection from '../../../components/public/common/FeatureSection';
import NewsletterSection from '../../../components/public/common/NewsletterSection';
import ContactUsSection from '../../../components/public/contact/ContactUsSection';
import servicesCoverImage from '../../../assets/services-cover.jpg'; // Ensure you have an appropriate image
import SectionDivider from '../../../components/public/common/SectionDivider';
import Template from '../../../components/common/Template';


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
      </Template>
    </div>
  );
};

export default ServicesPage;
