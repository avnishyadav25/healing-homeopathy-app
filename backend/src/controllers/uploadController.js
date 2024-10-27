// /backend/controllers/uploadController.js
const path = require('path');
const multer = require('multer');

// Define storage settings for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads/'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Controller to handle image upload
const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.status(200).json({ url: `/uploads/${req.file.filename}` });
};

module.exports = {
  upload,
  uploadImage,
};