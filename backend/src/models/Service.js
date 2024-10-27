// /backend/models/Service.js
const mongoose = require('mongoose');


const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  patients: { type: Number, required: true },
  details: { type: [String], required: true },
});

module.exports = mongoose.model('Service', ServiceSchema);
