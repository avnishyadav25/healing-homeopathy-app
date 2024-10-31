const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const register = async (req, res) => {
  const {
    name, email, password, role, licenseNumber, problem, reason, profilePhoto, address, socialLinks, about, gender, age, education, experience, status = 'Pending'
  } = req.body;

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
      profilePhoto,
      address,
      socialLinks,
      about,
      gender,
      age,
      education,
      experience,
      status, // Default to 'Pending'
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create a new user (Admin feature)
const createUser = async (req, res) => {
  const {
    name, email, password, role, licenseNumber, problem, reason, profilePhoto, address, socialLinks, about, gender, age, education, experience, status = 'Pending'
  } = req.body;

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
      profilePhoto,
      address,
      socialLinks,
      about,
      gender,
      age,
      education,
      experience,
      status, // Default to 'Pending' or as provided
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, role: user.role, name: user.name, email: user.email });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(`Error fetching user by ID (${id}):`, error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Complete registration
const completeRegistration = async (req, res) => {
  const { role, licenseNumber, problem, reason, profilePhoto, address, socialLinks, about, gender, age, education, experience, status } = req.body;

  try {
    const user = await User.findById(req.user._id);
    user.role = role;
    user.status = status || user.status;

    if (role === 'Doctor') user.licenseNumber = licenseNumber;
    if (role === 'Patient') user.problem = problem;
    if (role === 'Customer') user.reason = reason;

    Object.assign(user, {
      profilePhoto,
      address,
      socialLinks,
      about,
      gender,
      age,
      education,
      experience,
    });

    await user.save();
    res.status(200).json({ message: 'Registration completed successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    name, email, password, role, licenseNumber, problem, reason, profilePhoto, address, socialLinks, about, gender, age, education, experience, status
  } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.status = status || user.status; // Update status
    user.licenseNumber = role === 'Doctor' ? licenseNumber : undefined;
    user.problem = role === 'Patient' ? problem : undefined;
    user.reason = role === 'Customer' ? reason : undefined;
    user.profilePhoto = profilePhoto || user.profilePhoto;
    user.address = address || user.address;
    user.socialLinks = socialLinks || user.socialLinks;
    user.about = about || user.about;
    user.gender = gender || user.gender;
    user.age = age || user.age;
    user.education = education || user.education;
    user.experience = experience || user.experience;

    // Only update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(`Error updating user by ID (${id}):`, error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { register, login, getUsers, getUserById, completeRegistration, updateUser, createUser };
