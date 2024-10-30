// /backend/controllers/companyController.js
const Company = require('../models/Company');
const path = require('path');

// Helper function to process file uploads
const processFiles = (files) => {
  const processedFiles = {};
  if (files.logo && files.logo[0]) {
    processedFiles.logo = `/company/${files.logo[0].filename}`;
  }
  if (files.images) {
    processedFiles.images = files.images.map((file) => `/company/${file.filename}`);
  }
  return processedFiles;
};

// Create a new company
const createCompany = async (req, res) => {
  try {
    const data = { ...req.body, ...processFiles(req.files) };
    const company = new Company(data);
    await company.save();
    res.status(201).json({ message: 'Company created successfully', company });
  } catch (error) {
    res.status(500).json({ message: 'Error creating company', error });
  }
};

// Update a company
const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body, ...processFiles(req.files) };
    const company = await Company.findByIdAndUpdate(id, updatedData, { new: true });
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json({ message: 'Company updated successfully', company });
  } catch (error) {
    res.status(500).json({ message: 'Error updating company', error });
  }
};

// Get company details
const getCompany = async (req, res) => {
  try {
    const company = await Company.findOne(); // Assuming there's only one company record
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching company', error });
  }
};

module.exports = {
  createCompany,
  updateCompany,
  getCompany,
};
