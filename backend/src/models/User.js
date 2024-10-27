// /backend/src/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Doctor', 'Patient', 'Customer'],
    required: true,
  },
  licenseNumber: {
    type: String,
    required: false,//function() { return this.role === 'Doctor'; },
  },
  problem: {
    type: String,
    required: false, //function() { return this.role === 'Patient'; },
  },
  reason: {
    type: String,
    required: false, //function() { return this.role === 'Customer'; },
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
