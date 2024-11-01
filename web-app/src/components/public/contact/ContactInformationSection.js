// /src/components/ContactInformationSection.js

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import contactImage from '../../../assets/contact-image.jpg';
import ContactForm from '../../common/ContactForm'; // Import the standalone ContactForm component

const ContactInformationSection = () => {
  return (
    <div className="contact-info-section py-5">
      <Container>
        <Row>
          <Col md={6} className="mb-4">
            <Card className="shadow-sm border-0">
              <Row className="g-0">
                <Col md={4}>
                  <img src={contactImage} alt="Contact" className="img-fluid rounded-start h-100" style={{ objectFit: 'cover' }} />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>Contact Us</Card.Title>
                    <Card.Text>Email: info@healinghomoeopathy.com</Card.Text>
                    <Card.Text>Call: +1 234 567 890</Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <Card.Title>Have a query? Contact Us</Card.Title>
                <ContactForm /> {/* Use the standalone ContactForm component */}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Map Section */}
        <Row className="mt-5">
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <Card.Title>Our Location</Card.Title>
                <div className="map-container" style={{ height: '300px', borderRadius: '10px', overflow: 'hidden' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093157!2d144.95592331531815!3d-37.81720997975157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f9cd71%3A0x5045675218ce7e33!2zMjAwIEZsZWRlIFN0LCBNZWxib3VybmUgVklDIDMwMDAg4Kao4KeN4Kaw4KeL4KaV4KeH4KafIOCnjeCkvuCkryDgpKTgpL_gpYHgpKrgpLDgpY3gpLngpLDgpY3gpLA!5e0!3m2!1sen!2sin!4v1618820621319!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Our Location"
                  ></iframe>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactInformationSection;
