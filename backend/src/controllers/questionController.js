// /backend/src/controllers/questionController.js

const Question = require('../models/Question');

const createSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const generateUniqueSlug = async (title) => {
  let slug = createSlug(title);
  let uniqueSlug = slug;
  let counter = 1;
  while (await Question.findOne({ urlSlug: uniqueSlug })) {
    uniqueSlug = `${slug}-${counter++}`;
  }
  return uniqueSlug;
};

exports.postQuestion = async (req, res) => {
  try {
    const { title, content, tags, categories } = req.body;
    const urlSlug = await generateUniqueSlug(title);

    const question = await Question.create({
      title,
      content,
      userId: req.user.id,
      tags,
      categories,
      urlSlug
    });
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create question' });
  }
};

// Get question by URL slug
exports.getQuestionBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const question = await Question.findOne({ urlSlug: slug }).populate('userId', 'name').populate('replies');
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
