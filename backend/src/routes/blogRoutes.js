// /backend/routes/blogRoutes.js
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const {
  getBlogs,
  getAllBlogs,
  //getBlogById,
  getBlogByIdOrPermalink, // Updated function name
  getBlogsByAuthor,
  createOrUpdateBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  archiveBlog,
} = require('../controllers/blogController');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { permalink, title } = req.body;
    const blogUrl = permalink || (title ? title.toLowerCase().replace(/ /g, '-') : 'default');
    const dir = path.join(__dirname, '../../web-app/public/assets/blog', blogUrl);

    // Create directory if it does not exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Error: Images Only!'));
    }
  }
}).single('featuredImage');

// Middleware to create directory if it doesn't exist
const ensureDirExists = (req, res, next) => {
  const { permalink, title } = req.body;
  const blogUrl = permalink || (title ? title.toLowerCase().replace(/ /g, '-') : 'default');
  const dir = path.join(__dirname, '../../../web-app/public/assets/blog', blogUrl);

  // Create directory if it does not exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  next();
};

// Blog routes
router.get('/', getBlogs); // Get blogs with optional status and pagination
router.get('/all', getAllBlogs); // Get all blogs
//router.get('/:id', getBlogById); // Get a blog by ID
// Updated route to use `getBlogByIdOrPermalink` instead of `getBlogById`
router.get('/:identifier', getBlogByIdOrPermalink); // Supports both ID and permalink

router.get('/author/:author', getBlogsByAuthor); // Get blogs by author

router.post('/create', ensureDirExists, upload, createBlog); // Create a new blog with image upload
router.put('/update/:id', ensureDirExists, upload, updateBlog); // Update a blog with image upload

router.delete('/delete/:id', deleteBlog); // Delete a blog
router.patch('/archive/:id', archiveBlog); // Archive a blog

// Create or update a blog dynamically
router.post('/create-or-update/:id?', ensureDirExists, upload, createOrUpdateBlog);

module.exports = router;
