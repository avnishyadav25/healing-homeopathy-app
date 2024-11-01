// src/pages/ContactPage.js

import React from 'react';
import NavigationBar from '../../../components/common/NavigationBar';
import ContactCoverSection from '../../../components/public/contact/ContactCoverSection';
import ContactInformationSection from '../../../components/public/contact/ContactInformationSection';
import Template from '../../../components/common/Template';


const ContactPage = () => {
  return (
    <div>
      <Template>
      <ContactCoverSection />
      <ContactInformationSection />
      </Template>
    </div>
  );
};

export default ContactPage;
