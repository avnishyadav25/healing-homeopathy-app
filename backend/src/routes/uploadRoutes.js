// /backend/routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const { upload, uploadImage } = require('../controllers/uploadController');

// Route to handle image upload
router.post('/', upload.single('image'), uploadImage);

module.exports = router;