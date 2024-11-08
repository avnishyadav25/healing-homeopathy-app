// /backend/src/controllers/tagController.js
const Tag = require('../models/Tag');

// Create a new tag
const createTag = async (req, res) => {
  try {
    const tag = new Tag(req.body);
    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ message: 'Error creating tag', error });
  }
};

const getAllTags = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [tags, totalTags] = await Promise.all([
      Tag.find().skip(skip).limit(limit),
      Tag.countDocuments()
    ]);

    res.status(200).json({
      tags,
      totalPages: Math.ceil(totalTags / limit),
    });
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
};

// Get all tags with pagination
const getTags = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default to page 1 and 10 tags per page

  try {
    const tags = await Tag.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalTags = await Tag.countDocuments(); // Total count of tags for pagination

    res.status(200).json({
      tags,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalTags / limit),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tags', error });
  }
};

// Get tag by ID
const getTagById = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ message: 'Tag not found' });
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tag', error });
  }
};

// Update tag
const updateTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tag) return res.status(404).json({ message: 'Tag not found' });
    res.status(200).json(tag);
  } catch (error) {
    res.status(400).json({ message: 'Error updating tag', error });
  }
};

// Delete tag
const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) return res.status(404).json({ message: 'Tag not found' });
    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tag', error });
  }
};

const createOrUpdateTags = async (req, res) => {
  const { tags } = req.body; // Tags array from frontend

  if (!Array.isArray(tags)) {
    return res.status(400).json({ error: 'Invalid tags format. Expected an array.' });
  }

  try {
    const promises = tags.map(async (tagName) => {
      let tag = await Tag.findOne({ name: tagName });
      if (!tag) {
        tag = await Tag.create({ name: tagName });
      }
      return tag;
    });

    const updatedTags = await Promise.all(promises); // Wait for all tags to be processed
    res.status(200).json({ tags: updatedTags });
  } catch (error) {
    console.error('Error creating or updating tags:', error);
    res.status(500).json({ error: 'Server error in creating or updating tags' });
  }
};

module.exports = { createTag, getTags, getTagById, updateTag, deleteTag, createOrUpdateTags, getAllTags };
