// /backend/routes/companyRoutes.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { createCompany, updateCompany, getCompany } = require('../controllers/companyController');
const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../../web-app/public/assets/company');

    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    // Ensure file is saved as logo.png or logo.jpg
    const logoName = ext === '.jpg' || ext === '.jpeg' ? 'logo.jpg' : 'logo.png';

    // Check if the logo file already exists and delete it if so
    const logoPath = path.join(__dirname, '../../../web-app/public/assets/company', logoName);
    if (fs.existsSync(logoPath)) {
      fs.unlinkSync(logoPath); // Remove old logo file
    }

    cb(null, logoName);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only PNG, JPG, and JPEG images are allowed!'));
    }
  }
});

// Define routes
router.post('/create', upload.fields([{ name: 'logo' }, { name: 'images' }]), createCompany); // Create a company
router.put('/update/:id', upload.fields([{ name: 'logo' }, { name: 'images' }]), updateCompany); // Update a company by ID
router.get('/', getCompany); // Get company details

module.exports = router;
