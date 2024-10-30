const Blog = require('../models/Blog'); // Ensure the correct path to your Blog model
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Helper function to save featured images in `web-app/public/assets/blog/[blog-url]/[blog-name].jpg`
const saveImage = (file, blogUrl) => {
  const dirPath = path.join(__dirname, '../../../web-app/public/assets/blog', blogUrl);
  const imagePath = path.join(dirPath, `${blogUrl}${path.extname(file.originalname)}`);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Check if an image with the same name exists and remove it
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }

  // Move the new image file
  fs.renameSync(file.path, imagePath);

  return `/blog/${blogUrl}/${blogUrl}${path.extname(file.originalname)}`;
};


// Create a new blog
const createBlog = async (req, res) => {
  try {
    const { title, content, tags, category, permalink, author, publishTime, status } = req.body;
    const blogUrl = permalink || title.toLowerCase().replace(/ /g, '-');
    const featuredImage = req.file ? saveImage(req.file, blogUrl) : null;

    const newBlog = new Blog({
      title,
      content,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      category,
      permalink: blogUrl,
      author,
      publishTime,
      featuredImage,
      status
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error });
  }
};

//Update Blog
const updateBlog = async (req, res) => {
  try {
    const { title, content, tags, category, permalink, author, publishTime, status } = req.body;
    const { id } = req.params;
    console.log('#### hello 1', req.body);
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const blogUrl = permalink || blog.permalink || title.toLowerCase().replace(/ /g, '-');
    let featuredImage = blog.featuredImage;

    if (req.file) {
      // Remove old image if it exists
      if (featuredImage) {
        const oldImagePath = path.join(__dirname, '../../../web-app/public', featuredImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      // Save new image
      featuredImage = saveImage(req.file, blogUrl);
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.tags = tags ? tags.split(',').map(tag => tag.trim()) : blog.tags;
    blog.category = category || blog.category;
    blog.permalink = blogUrl;
    blog.author = author || blog.author;
    blog.publishTime = publishTime || blog.publishTime;
    blog.status = status || blog.status;
    blog.featuredImage = featuredImage;
    blog.updatedAt = Date.now();

    await blog.save();
    res.status(200).json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error });
  }
};



const createOrUpdateBlog = async (req, res) => {
  try {
    const { title, content, tags, category, permalink, author, publishTime, status } = req.body;
    const { id } = req.params;
    const blogUrl = permalink || title.toLowerCase().replace(/ /g, '-');
    console.log('#### blog', blog);
    let blog = id ? await Blog.findById(id) : null;
    let featuredImage = blog ? blog.featuredImage : null;
    console.log('#### req.file', req.file);
    if (req.file) {
      if (featuredImage) {
        const oldImagePath = path.join(__dirname, '../../../web-app/public', featuredImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      featuredImage = saveImage(req.file, blogUrl);
    }

    if (blog) {
      // Update existing blog
      blog.title = title || blog.title;
      blog.content = content || blog.content;
      blog.tags = tags ? tags.split(',').map(tag => tag.trim()) : blog.tags;
      blog.category = category || blog.category;
      blog.permalink = blogUrl;
      blog.author = author || blog.author;
      blog.publishTime = publishTime || blog.publishTime;
      blog.status = status || blog.status;
      blog.featuredImage = featuredImage;
      blog.updatedAt = Date.now();

      await blog.save();
      res.status(200).json({ message: 'Blog updated successfully', blog });
    } else {
      // Create new blog
      blog = new Blog({
        title,
        content,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        category,
        permalink: blogUrl,
        author,
        publishTime,
        featuredImage,
        status
      });

      await blog.save();
      res.status(201).json({ message: 'Blog created successfully', blog });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error processing blog', error });
  }
};


// Get all blogs with pagination and optional status
const getBlogs = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = status ? { status } : {}; // Query by status if provided

    const blogs = await Blog.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .exec();

    const totalBlogs = await Blog.countDocuments(query);

    res.status(200).json({
      blogs,
      currentPage: Number(page),
      totalPages: Math.ceil(totalBlogs / limit),
      totalBlogs,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
};

// Get all blogs without pagination
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error });
  }
};

const getBlogByIdOrPermalink = async (req, res) => {
  const { identifier } = req.params;
  
  try {
    let blog;
    // Check if the identifier is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      blog = await Blog.findById(identifier);
    }
    
    // If not found by ObjectId, try finding by permalink
    if (!blog) {
      blog = await Blog.findOne({ permalink: identifier });
    }

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.status(200).json(blog);
  } catch (error) {
    console.log('### error getBlogByIdOrPermalink ', error);
    res.status(500).json({ message: 'Error fetching blog', error });
  }
};


// Get blogs by author
const getBlogsByAuthor = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.params.author });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs by author', error });
  }
};



// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.featuredImage) {
      const imagePath = path.join(__dirname, '../../../web-app/public', blog.featuredImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await blog.remove();
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error });
  }
};

// Archive a blog
const archiveBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { archived: true },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog archived successfully', blog });
  } catch (error) {
    res.status(500).json({ message: 'Error archiving blog', error });
  }
};



module.exports = {
  createBlog,
  getBlogs,
  getAllBlogs,
  getBlogById,
  getBlogByIdOrPermalink, // Updated export
  getBlogsByAuthor,
  updateBlog,
  deleteBlog,
  archiveBlog,
  createOrUpdateBlog,
};
