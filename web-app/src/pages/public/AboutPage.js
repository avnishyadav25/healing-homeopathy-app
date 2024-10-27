// src/pages/AboutPage.js

import React from 'react';
import Template from '../../components/common/Template';
import NavigationBar from '../../components/common/NavigationBar';
import AboutCoverSection from '../../components/AboutCoverSection';
import MissionStatementSection from '../../components/MissionStatementSection';
import OurStorySection from '../../components/OurStorySection';
import OurTeamSection from '../../components/OurTeamSection';
import OurApproachSection from '../../components/OurApproachSection';
import FeatureSection from '../../components/FeatureSection';
import CertificationsSection from '../../components/CertificationsSection';
import NewsletterSection from '../../components/NewsletterSection';
import ContactUsSection from '../../components/ContactUsSection';
import SectionDivider from '../../components/SectionDivider';

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
      <SectionDivider color="#004d40" thickness="3px" margin="40px 0" />
      </Template>
    </div>
  );
};

export default AboutPage;
