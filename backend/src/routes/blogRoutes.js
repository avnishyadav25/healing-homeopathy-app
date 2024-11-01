// /backend/src/routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlogByIdOrPermalink,
  createBlog,
  updateBlog,
  deleteBlog,
  archiveBlog,
} = require('../controllers/blogController');

// Blog routes
router.get('/', getBlogs); // Get blogs with optional status and pagination
router.get('/:identifier', getBlogByIdOrPermalink); // Get blog by ID or permalink

router.post('/create', createBlog); // Create a new blog
router.put('/update/:id', updateBlog); // Update an existing blog

router.delete('/delete/:id', deleteBlog); // Delete a blog
router.patch('/archive/:id', archiveBlog); // Archive a blog

module.exports = router;
