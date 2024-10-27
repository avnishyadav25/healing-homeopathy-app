const ContactUs = require('../models/ContactUs');

exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const newContact = new ContactUs({
      name,
      email,
      phone,
      message,
    });

    await newContact.save();

    res.status(201).json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send your message. Please try again later.' });
  }
};
