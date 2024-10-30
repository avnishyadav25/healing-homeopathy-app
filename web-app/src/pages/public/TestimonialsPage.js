// src/pages/TestimonialsPage.js

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import NavigationBar from '../../components/common/NavigationBar';
import customerImage1 from '../../assets/customer1.jpg';
import customerImage2 from '../../assets/customer1.jpg';
import customerImage3 from '../../assets/customer1.jpg';
import customerImage4 from '../../assets/customer1.jpg';
import customerImage5 from '../../assets/customer1.jpg';
import customerImage6 from '../../assets/customer1.jpg';
import customerImage7 from '../../assets/customer1.jpg';
import customerImage8 from '../../assets/customer1.jpg';
import customerImage9 from '../../assets/customer1.jpg';
import customerImage10 from '../../assets/customer1.jpg';

const testimonials = [
  {
    name: "John Doe",
    feedback: "I had been struggling with chronic migraines for years, but after a personalized consultation with Healing Homoeopathy, I finally found relief. The natural remedies and caring approach made all the difference.",
    image: customerImage1,
  },
  {
    name: "Jane Smith",
    feedback: "Healing Homoeopathy has transformed my life. Their holistic approach helped me overcome anxiety and stress in a way that conventional medicine never could.",
    image: customerImage2,
  },
  {
    name: "Michael Johnson",
    feedback: "The team at Healing Homoeopathy is fantastic! Their personalized care and attention to detail ensured I received the best treatment possible for my chronic condition.",
    image: customerImage3,
  },
  {
    name: "Emily Davis",
    feedback: "After years of battling with digestive issues, I finally found a solution with Healing Homoeopathy. Their natural remedies worked wonders, and I feel healthier than ever.",
    image: customerImage4,
  },
  {
    name: "Chris Lee",
    feedback: "I was skeptical about Homoeopathy at first, but the results speak for themselves. Healing Homoeopathy's approach to treating the whole person really works.",
    image: customerImage5,
  },
  {
    name: "Sarah Wilson",
    feedback: "The personalized care I received from Healing Homoeopathy was unparalleled. They truly listened to my concerns and tailored a treatment plan that worked for me.",
    image: customerImage6,
  },
  {
    name: "David Martinez",
    feedback: "Healing Homoeopathy helped me manage my chronic pain in a way that no other treatment could. I'm so grateful for their compassionate care and effective remedies.",
    image: customerImage7,
  },
  {
    name: "Sophia Brown",
    feedback: "The natural remedies from Healing Homoeopathy have made a huge difference in my life. I feel more balanced and healthier overall.",
    image: customerImage8,
  },
  {
    name: "James Anderson",
    feedback: "I appreciate the holistic approach at Healing Homoeopathy. They not only treated my symptoms but also focused on my overall well-being.",
    image: customerImage9,
  },
  {
    name: "Olivia Taylor",
    feedback: "The care and attention I received from Healing Homoeopathy were exceptional. Their personalized treatments helped me achieve better health naturally.",
    image: customerImage10,
  },
];

const TestimonialsPage = () => {
  return (
    <div>
      <NavigationBar />
      <Container className="testimonials-page py-5">
        <h2 className="text-center mb-5">Patient Testimonials</h2>
        <Row>
          {testimonials.map((testimonial, index) => (
            <Col md={4} className="mb-4" key={index}>
              <Card className="text-center">
                <div className="testimonial-image-container">
                  <Card.Img 
                    variant="top" 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="testimonial-image"
                  />
                </div>
                <Card.Body>
                  <Card.Title>{testimonial.name}</Card.Title>
                  <Card.Text>
                    "{testimonial.feedback}"
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default TestimonialsPage;
