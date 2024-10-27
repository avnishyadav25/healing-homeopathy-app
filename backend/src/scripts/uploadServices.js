// /backend/scripts/uploadServices.js

const mongoose = require('mongoose');
const Service = require('../models/Service'); // Import your Service model
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const services = [
  {
    title: "Personalized Consultation",
    image: "consultation.jpg",
    description: "Our personalized consultations are designed to address your unique health needs with tailored treatment plans, offering in-depth medical history analysis and holistic health approaches.",
    link: "/services/personalized-consultation",
    patients: 1200,
    details: [
      "Tailored treatment plans.",
      "One-on-one consultations.",
      "Comprehensive health assessments.",
      "Personalized follow-up care.",
      "Customized dietary and lifestyle advice.",
      "Holistic health approach.",
      "In-depth medical history analysis.",
      "Regular monitoring and adjustment of treatment.",
      "Focus on root cause of symptoms.",
      "Support for chronic conditions.",
      "Integration with other healthcare providers.",
      "Privacy and confidentiality ensured.",
    ],
  },
  {
    title: "Natural Remedies",
    image: "remedies.jpg",
    description: "Explore our range of natural remedies, ethically sourced and free from artificial additives, to support your well-being through non-invasive, safe, and effective treatments.",
    link: "/services/natural-remedies",
    patients: 980,
    details: [
      "Wide range of natural products.",
      "Support for various health issues.",
      "No artificial additives.",
      "Non-invasive treatments.",
      "Safe for long-term use.",
      "Ethically sourced ingredients.",
      "Environmentally friendly products.",
      "No side effects.",
      "Suitable for all ages.",
      "Support for immune system.",
      "Complementary to other treatments.",
      "Trusted by health professionals.",
    ],
  },
  {
    title: "Family Wellness",
    image: "wellness.jpg",
    description: "Our family wellness services provide comprehensive homeopathic care for all ages, promoting long-term health and wellness through preventive care and holistic treatments.",
    link: "/services/family-wellness",
    patients: 800,
    details: [
      "Care for all family members.",
      "Preventative healthcare.",
      "Support for children and adults.",
      "Treatment for common ailments.",
      "Family-focused consultations.",
      "Education on health and wellness.",
      "Personalized treatment plans.",
      "Long-term health management.",
      "Support for chronic conditions.",
      "Holistic family care.",
      "Safe for all ages.",
      "Focus on overall family health.",
    ],
  },
  {
    title: "Chronic Condition",
    image: "chronic.jpg",
    description: "We specialize in treating chronic conditions with a focus on long-term management and holistic care, aiming to improve your quality of life with personalized treatment plans.",
    link: "/services/chronic-condition",
    patients: 670,
    details: [
      "Specialized in chronic conditions.",
      "Long-term management.",
      "Root cause treatment.",
      "Personalized care plans.",
      "Regular monitoring.",
      "Holistic approach.",
      "Support for co-existing conditions.",
      "Non-invasive treatments.",
      "Focus on quality of life.",
      "Integration with other healthcare providers.",
      "Safe and effective.",
      "Ongoing patient education.",
    ],
  },
  {
    title: "Mental Well-being",
    image: "mental.jpg",
    description: "Our mental well-being services use natural remedies and holistic approaches to support your emotional and mental health, providing personalized care for lasting results.",
    link: "/services/mental-wellbeing",
    patients: 540,
    details: [
      "Holistic mental health care.",
      "Support for anxiety and depression.",
      "Natural remedies for stress.",
      "Personalized treatment plans.",
      "Focus on mental and emotional well-being.",
      "Support for chronic mental health issues.",
      "No side effects.",
      "Safe for long-term use.",
      "Integration with other mental health treatments.",
      "Support for sleep disorders.",
      "Caring and compassionate approach.",
      "Ongoing monitoring and support.",
    ],
  },
  {
    title: "Immune Boosting",
    image: "immune.jpg",
    description: "Our immune-boosting treatments are designed to strengthen your immune system naturally, helping you maintain optimal health through safe and effective remedies.",
    link: "/services/immune-boosting",
    patients: 860,
    details: [
      "Boost your immune system naturally.",
      "Support for overall health.",
      "Personalized immune-boosting plans.",
      "Safe and effective remedies.",
      "No artificial ingredients.",
      "Holistic approach to immunity.",
      "Support for chronic immune conditions.",
      "Preventative care.",
      "Support for recovery from illness.",
      "Education on immune health.",
      "Complementary to other treatments.",
      "Trusted by health professionals.",
    ],
  },
  {
    title: "Medicine Delivery",
    image: "delivery.jpg",
    description: "Our fast and reliable medicine delivery service ensures that your homeopathic treatments reach you safely and on time, with convenient online ordering and professional handling.",
    link: "/services/medicine-delivery",
    patients: 1500,
    details: [
      "Fast delivery service.",
      "Reliable and safe.",
      "Wide range of homeopathic medicines.",
      "Convenient online ordering.",
      "Delivery to your doorstep.",
      "Professional handling of medicines.",
      "Safe packaging.",
      "Timely delivery.",
      "Order tracking available.",
      "Support for urgent needs.",
      "Affordable delivery options.",
      "Trusted by thousands of customers.",
    ],
  },
  // Add other services here similarly
];

  
const baseImageUrl = process.env.BASE_IMAGE_URL || 'http://localhost:3000/uploads/';
const pathDB= process.env.MONGO_URI;
const uploadServices = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/healinghomoeopathy', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Iterate over each service and upload to the database
    for (const service of services) {
      // Handle the image path
      const imagePath = path.join(__dirname, '../uploads', service.image);
      const imageExists = fs.existsSync(imagePath);

      if (!imageExists) {
        console.error(`Image not found at path: ${imagePath}`);
        continue; // Skip this service if image doesn't exist
      }

      // Create a new service object
      const newService = new Service({
        title: service.title,
        image: `${baseImageUrl}${service.image}`,
        description: service.description,
        link: service.link,
        patients: service.patients,
        details: service.details,
      });

      // Save to the database
      await newService.save();
      console.log(`Uploaded service: ${service.title}`);
    }

    console.log('All services uploaded successfully!');
  } catch (error) {
    console.error('Error uploading services:', error);
  } finally {
    mongoose.connection.close();
  }
};

uploadServices();
