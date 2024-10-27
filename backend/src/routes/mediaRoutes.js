const express = require('express');
const multer = require('multer');
const path = require('path');
const Blog = require('../models/Blog'); // Ensure this is the correct path to your Blog model
const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: './uploads/', // or your preferred directory
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  },
});

const upload = multer({ storage: storage });

// Image upload endpoint
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ url: `/uploads/${req.file.filename}` }); // Send back the file URL
});

// Create blog endpoint
router.post('/blogs/create', async (req, res) => {
  try {
    const { title, content, tags, category, permalink, author, publishTime } = req.body;
    const featuredImage = req.file ? `/uploads/${req.file.filename}` : null;

    const newBlog = new Blog({
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()), // Assuming tags are comma-separated
      category,
      permalink,
      author,
      publishTime,
      featuredImage,
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error });
  }
});

module.exports = router;
