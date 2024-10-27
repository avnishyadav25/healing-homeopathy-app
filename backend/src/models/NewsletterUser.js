// /backend/models/NewsletterUser.js
const mongoose = require('mongoose');

const NewsletterUserSchema = new mongoose.Schema({
  email: String,
  subscribedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NewsletterUser', NewsletterUserSchema);
