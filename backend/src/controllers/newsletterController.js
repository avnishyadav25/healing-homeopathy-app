// /backend/controllers/newsletterController.js

const NewsletterSubscriber = require('../models/NewsletterSubscriber');

const subscribeToNewsletter = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email already exists
    const existingSubscriber = await NewsletterSubscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'This email is already subscribed.' });
    }

    const newSubscriber = new NewsletterSubscriber({ email });
    await newSubscriber.save();

    res.status(200).json({ message: 'Subscription successful!' });
  } catch (error) {
    res.status(500).json({ message: 'Subscription failed. Please try again later.' });
  }
};

const getNewsletterUsers = async (req, res) => {
  try {
    const newsletterUsers = await NewsletterUser.find();
    res.status(200).json(newsletterUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching newsletter users' });
  }
};


// Export the controller function(s)
module.exports = {
  subscribeToNewsletter,
  getNewsletterUsers
};
