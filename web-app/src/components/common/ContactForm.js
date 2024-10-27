// /src/components/ContactForm.js

import React, { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import Button from './Button'; // Assuming your generic button component is here

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [alert, setAlert] = useState({ type: '', message: '' });

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/contact/contact-us`, formData);
      setAlert({ type: 'success', message: response.data.message });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setAlert({ type: 'danger', message: 'Failed to send your message. Please try again later.' });
    }
  };

  return (
    <div>
      {alert.message && <Alert variant={alert.type}>{alert.message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="phone" className="mt-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="message" className="mt-3">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter your message" value={formData.message} onChange={handleChange} required />
        </Form.Group>
        <Button variant="contained" endIcon={<SendIcon />} type="submit" className="mt-4">
          Contact Us
        </Button>
      </Form>
    </div>
  );
};

export default ContactForm;
