// src/pages/AboutPage.js

import React from 'react';
import Template from '../../../components/common/Template';
import NavigationBar from '../../../components/common/NavigationBar';
import AboutCoverSection from '../../../components/public/about/AboutCoverSection';
import MissionStatementSection from '../../../components/public/about/MissionStatementSection';
import OurStorySection from '../../../components/public/about/OurStorySection';
import OurTeamSection from '../../../components/public/about/OurTeamSection';
import OurApproachSection from '../../../components/public/about/OurApproachSection';
import FeatureSection from '../../../components/public/common/FeatureSection';
import CertificationsSection from '../../../components/public/common/CertificationsSection';
import NewsletterSection from '../../../components/public/common/NewsletterSection';
import ContactUsSection from '../../../components/public/contact/ContactUsSection';
import SectionDivider from '../../../components/public/common/SectionDivider';

const AboutPage = () => {
  return (
    <div>
      <Template>
      <AboutCoverSection />
      <MissionStatementSection />
      <SectionDivider color="#004d40" thickness="3px" margin="40px 0" />
      <OurStorySection />
      <OurTeamSection />
      <OurApproachSection />
      <SectionDivider color="#004d40" thickness="3px" margin="40px 0" /> 
      <FeatureSection />
      <SectionDivider color="#004d40" thickness="3px" margin="40px 0" />
      <CertificationsSection />
      <NewsletterSection />
      <ContactUsSection />
      </Template>
    </div>
  );
};

export default AboutPage;
