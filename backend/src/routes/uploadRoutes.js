// /src/routes/uploadRoute.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { uploadFile } = require('../controllers/uploadController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../../web-app/public/assets/temp'); // Temporary folder
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath); // Save temporarily
  },
  filename: (req, file, cb) => {
    const { imageName } = req.body; // Use imageName if provided
    console.log('#### imageName = ', imageName);
    const finalName = imageName || file.originalname; // Fallback to original filename if imageName isn't provided
    console.log('#### finalName = ', finalName);
    cb(null, finalName);
  }
});

const upload = multer({ storage: storage }).single('file');

// POST route to handle file upload
router.post('/', upload, uploadFile);

module.exports = router;
