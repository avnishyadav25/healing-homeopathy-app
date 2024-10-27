import React from 'react';
import Template from '../../components/common/Template';
import CoverSection from '../../components/CoverSection';
import HeroSection from '../../components/HeroSection';
import WhyChooseUsSection from '../../components/WhyChooseUsSection';
import SectionDivider from '../../components/SectionDivider';
import FeatureSection from '../../components/FeatureSection';
import BlogSection from '../../components/BlogSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import NewsletterSection from '../../components/NewsletterSection';
import CertificationsSection from '../../components/CertificationsSection';
import ContactUsSection from '../../components/ContactUsSection';
import NewsletterSignupSection from '../../components/public/NewsletterSignupSection';
import homepageCoverImage from '../../assets/homepage-cover.jpg'; // Ensure you have an appropriate image

const HomePage = () => {
  const buttons = [
    { text: "Order Medicine", link: "/order-medicine", variant: "success" },
    { text: "Book Appointment", link: "/book-appointment", variant: "primary" },
    { text: "Know More", link: "/about", variant: "outline-dark" }
  ];

  return (
    <Template>
      <CoverSection 
        title="Welcome to Healing Homoeopathy" 
        subtitle="At Healing Homoeopathy, we believe in the power of nature to heal. Our practice is dedicated to providing personalized homeopathic treatments that address the root cause of your health concerns. With a focus on holistic wellness, we offer natural remedies that are tailored to your individual needs, helping you achieve a balanced and healthy life." 
        image={homepageCoverImage}
        buttons={buttons} 
      />
      <HeroSection />
      <WhyChooseUsSection />
      <FeatureSection />
      <SectionDivider color="#004d40" thickness="3px" margin="40px 0" />
      <BlogSection />
      <SectionDivider color="#004d40" thickness="3px" margin="40px 0" />
      <TestimonialsSection />
      <NewsletterSection />
      <ContactUsSection />
      <NewsletterSignupSection />
      <SectionDivider color="#004d40" thickness="3px" margin="40px 0" />
    </Template>
  );
};

export default HomePage;
