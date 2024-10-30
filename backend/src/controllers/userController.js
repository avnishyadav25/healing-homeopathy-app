// /backend/src/controllers/userController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
  const { name, email, password, role, licenseNumber, problem, reason } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      licenseNumber: role === 'Doctor' ? licenseNumber : undefined,
      problem: role === 'Patient' ? problem : undefined,
      reason: role === 'Customer' ? reason : undefined,
    });

    // Respond with success message
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('#### email', email);
  console.log('#### password', password);

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('#### token', token);

    // Include user role, name, and email in the response
    res.status(200).json({ token, role: user.role, name: user.name, email: user.email });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

module.exports = {
  register,
  login,
  getUsers
};






/*const User = require('../models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const register = async (req, res) => {
  const { name, email, password, role, licenseNumber, problem, reason } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      licenseNumber: role === 'Doctor' ? licenseNumber : undefined,
      problem: role === 'Patient' ? problem : undefined,
      reason: role === 'Customer' ? reason : undefined,
    });

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Verify your email for Healing Homoeopathy',
      text: `Please verify your email by clicking the following link: ${process.env.BASE_URL}/verify-email?token=${user._id}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).json({ message: 'Error sending email' });
      }
    });

    res.status(201).json({ message: 'User registered successfully. Please check your email for verification.', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  register,
};*/
