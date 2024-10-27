// /backend/controllers/newsletterUserController.js
const NewsletterUser = require('../models/NewsletterUser');

exports.getNewsletterUsers = async (req, res) => {
  try {
    const newsletterUsers = await NewsletterUser.find();
    res.status(200).json(newsletterUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching newsletter users' });
  }
};
