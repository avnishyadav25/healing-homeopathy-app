// src/pages/ServicePageTemplate.js

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import NavigationBar from '../../components/common/NavigationBar';
import Footer from '../../components/common/Footer';
import CoverSection from '../../components/CoverSection';
import SectionDivider from '../../components/SectionDivider'; // Assuming you have a SectionDivider component

const ServicePageTemplate = ({ title, image, description, benefits, buttonText, buttonLink }) => {
  return (
    <div>
      <NavigationBar />
      <CoverSection title={title} subtitle="Discover the benefits of our specialized services" image={image} />
      <div className="service-page py-5">
        <Container>
          <Row className="mb-5">
            <Col md={6}>
              <h2>{title}</h2>
              <p>{description}</p>
              <Button variant="success" href={buttonLink}>{buttonText}</Button>
            </Col>
            <Col md={6}>
              <img src={image} alt={title} className="img-fluid rounded" />
            </Col>
          </Row>

          {/* Section Divider */}
          <SectionDivider color="#004d40" thickness="3px" margin="40px 0" />

          <Row>
            <Col>
              <h3 className="text-center mb-4">Benefits of {title}</h3>
              <ul className="benefits-list">
                {benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ServicePageTemplate;
