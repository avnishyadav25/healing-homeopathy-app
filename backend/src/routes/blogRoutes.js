// /backend/routes/blogRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const {
  getBlogs,
  getAllBlogs,
  getBlogById,
  getBlogsByAuthor,
  createOrUpdateBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  archiveBlog,
} = require('../controllers/blogController');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Blog routes
router.get('/', getBlogs); // Get all blogs with optional status and pagination
router.get('/all', getAllBlogs);
router.get('/:id', getBlogById); // Get a blog by its ID
router.get('/author/:author', getBlogsByAuthor); // Get blogs by author
router.post('/create', upload.single('featuredImage'), createBlog); // Create a new blog
router.put('/update/:id', upload.single('featuredImage'), updateBlog); // Update a blog
router.delete('/delete/:id', deleteBlog); // Delete a blog
router.patch('/archive/:id', archiveBlog); // Archive a blog

module.exports = router;