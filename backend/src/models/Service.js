// /backend/models/Service.js
const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: false },
  shortDescription: { type: String, required: false },
  description: { type: String, required: false },
  link: { type: String, required: true },
  patients: { type: Number, required: false },
  details: { type: [String], required: false },
  duration: { type: String },
  cost: { type: Number },
  status: { type: String, enum: ['published', 'draft', 'archived'], default: 'draft' },  // New status field
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Service', ServiceSchema);
