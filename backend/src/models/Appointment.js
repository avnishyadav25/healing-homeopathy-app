// /backend/models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  location: { type: String, required: true },
  problem: { type: String, required: true },
  appointmentDate: { type: Date, required: true, default: Date.now },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled', 'archive'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
