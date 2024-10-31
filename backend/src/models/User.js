const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['Doctor', 'Patient', 'Customer', 'Admin', 'Super Admin'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Active', 'Inactive'],
    default: 'Pending',
  },
  licenseNumber: { type: String },
  problem: { type: String },
  reason: { type: String },
  profilePhoto: { type: String },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  socialLinks: {
    facebook: String,
    twitter: String,
    linkedin: String,
    instagram: String,
  },
  about: { type: String },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  age: { type: Number },
  education: [
    {
      type: { type: String },
      detail: {
        major: String,
        degree: String,
        grade: String,
        startdate: Date,
        enddate: Date,
        remarks: String,
      },
    },
  ],
  experience: [
    {
      type: { type: String },
      detail: {
        position: String,
        company: String,
        dateofjoin: String,
        dateofretire: String,
        location: String,
        responsibilities: [String],
        description: String,
      },
    },
  ],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
