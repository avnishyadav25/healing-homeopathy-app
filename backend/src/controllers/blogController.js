// /backend/src/controllers/blogController.js

const Blog = require('../models/Blog'); // Ensure the correct path to your Blog model
const fs = require('fs');
const path = require('path');

// Create a new blog
const createBlog = async (req, res) => {
  try {
    const { title, content, tags, category, permalink, author, publishTime } = req.body;
    const featuredImage = req.file ? `/uploads/${req.file.filename}` : null;

    const newBlog = new Blog({
      title,
      content,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
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
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
};


// Get blogs with optional status and pagination
const getBlogs = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = status ? { status } : {}; // Query by status if provided

    const blogs = await Blog.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .exec();

    const totalBlogs = await Blog.countDocuments(query); // Total count for pagination

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

// Get a blog by ID
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

// Get blogs by author name
const getBlogsByAuthor = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.params.author });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs by author', error });
  }
};

// Update a blog
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, tags, category, permalink, author, publishTime } = req.body;
  const featuredImage = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (featuredImage) {
      if (blog.featuredImage) {
        fs.unlinkSync(path.join(__dirname, `../uploads/${path.basename(blog.featuredImage)}`));
      }
      blog.featuredImage = featuredImage;
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.tags = tags ? tags.split(',').map(tag => tag.trim()) : blog.tags;
    blog.category = category || blog.category;
    blog.permalink = permalink || blog.permalink;
    blog.author = author || blog.author;
    blog.publishTime = publishTime || blog.publishTime;
    blog.updatedAt = Date.now();

    const updatedBlog = await blog.save();
    res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error });
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
      fs.unlinkSync(path.join(__dirname, `../uploads/${path.basename(blog.featuredImage)}`));
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

// Create or Update a blog
const createOrUpdateBlog = async (req, res) => {
  const { id } = req.params; // Check if id is provided for update
  const { title, content, tags, category, permalink, author, publishTime } = req.body;
  const featuredImage = req.file ? `/uploads/${req.file.filename}` : null;
  console.log('##### createOrUpdateBlog', JSON.stringify(req.params));
  try {
    let blog;
    if (id) {
      // Update existing blog
      blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      if (featuredImage) {
        if (blog.featuredImage) {
          fs.unlinkSync(path.join(__dirname, `../uploads/${path.basename(blog.featuredImage)}`));
        }
        blog.featuredImage = featuredImage;
      }

      blog.title = title || blog.title;
      blog.content = content || blog.content;
      blog.tags = tags ? tags.split(',').map(tag => tag.trim()) : blog.tags;
      blog.category = category || blog.category;
      blog.permalink = permalink || blog.permalink;
      blog.author = author || blog.author;
      blog.publishTime = publishTime || blog.publishTime;
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
        permalink,
        author,
        publishTime,
        featuredImage,
      });

      await blog.save();
      res.status(201).json({ message: 'Blog created successfully', blog });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error processing blog', error });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getAllBlogs,
  getBlogById,
  getBlogsByAuthor,
  updateBlog,
  deleteBlog,
  archiveBlog,
  createOrUpdateBlog
};