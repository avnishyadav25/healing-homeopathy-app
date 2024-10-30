const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: { type: String },
  description: { type: String },
  shortDescription: { type: String },
  address: { type: String },
  logo: { type: String },
  images: [{ type: String }], // Array for multiple images
  timezone: { type: String, default: 'UTC' },
  language: { type: String, default: 'en' },
  phone: { type: String },
  email: { type: String },
  socialLinks: {
    facebook: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    instagram: { type: String }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Company', companySchema);
