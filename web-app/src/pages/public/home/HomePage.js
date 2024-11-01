import React from 'react';
import Template from '../../../components/common/Template';
import CoverSection from '../../../components/public/common/CoverSection';
import HeroSection from '../../../components/public/common/HeroSection';
import WhyChooseUsSection from '../../../components/public/common/WhyChooseUsSection';
import SectionDivider from '../../../components/public/common/SectionDivider';
import FeatureSection from '../../../components/public/common/FeatureSection';
import BlogSection from '../../../components/public/blog/BlogSection';
import TestimonialsSection from '../../../components/public/common/TestimonialsSection';
import NewsletterSection from '../../../components/public/common/NewsletterSection';
import ContactUsSection from '../../../components/public/contact/ContactUsSection';
import NewsletterSignupSection from '../../../components/public/common/NewsletterSignupSection';
import homepageCoverImage from '../../../assets/homepage-cover.jpg'; // Ensure you have an appropriate image

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
    </Template>
  );
};

export default HomePage;
