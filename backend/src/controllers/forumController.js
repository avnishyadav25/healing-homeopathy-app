// /backend/src/controllers/forumController.js
const Question = require('../models/Question');
const Reply = require('../models/Reply');
const Tag = require('../models/Tag');
const Category = require('../models/Category');

// Helper function to create a URL-friendly slug from a string
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')   // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, '');      // Trim leading or trailing hyphens
};

// Helper function to create a unique slug
const generateUniqueSlug = async (title) => {
  let slug = createSlug(title);
  let uniqueSlug = slug;
  let counter = 1;

  // Check if a question with this slug already exists, and increment if necessary
  while (await Question.findOne({ urlSlug: uniqueSlug })) {
    uniqueSlug = `${slug}-${counter++}`;
  }

  return uniqueSlug;
};

// Post a new question
exports.postQuestion = async (req, res) => {
  try {
    const { title, content, tags, categories, userId } = req.body;
    
    // Generate a unique slug for the question title
    const urlSlug = await generateUniqueSlug(title);

    // Find or create categories and tags
    const categoryIds = await Promise.all(categories.map(async (name) => {
      const category = await Category.findOneAndUpdate(
        { name },
        { $setOnInsert: { name } },
        { upsert: true, new: true }
      );
      return category._id;
    }));

    const tagIds = await Promise.all(tags.map(async (name) => {
      const tag = await Tag.findOneAndUpdate(
        { name },
        { $setOnInsert: { name } },
        { upsert: true, new: true }
      );
      return tag.name;
    }));

    // Create the question with the generated slug
    const question = await Question.create({
      title,
      content,
      userId,
      tags: tagIds,
      categories: categoryIds,
      urlSlug,
    });

    res.status(201).json(question);
  } catch (error) {
    console.error('Failed to create question:', error);
    res.status(500).json({ error: 'Failed to create question' });
  }
};

// Get all questions in reverse chronological order
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .sort({ createdAt: -1 }) // Latest first
      .populate('userId', 'name')
      .populate('replies');
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Post a reply
exports.postReply = async (req, res) => { 
  try {
    const { content, userId } = req.body;
    console.log('#### req.body = ',req.body);
    console.log('#### content = '+content);
    console.log('#### userId = '+userId);
    const { questionId } = req.params;
    const reply = await Reply.create({
      content,
      userId: userId,
      questionId,
    });
    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reply '+ error.message });
  }
};

// Like a reply
exports.likeReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    const { userId } = req.body;
    const reply = await Reply.findById(replyId);

    if (!reply.likes.includes(userId)) {
      reply.likes.push(userId);
      await reply.save();
    }
    res.json(reply);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Approve a reply (admin only)
exports.approveReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    const reply = await Reply.findByIdAndUpdate(replyId, { approved: true }, { new: true });
    res.json(reply);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a reply (admin only)
exports.deleteReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    await Reply.findByIdAndDelete(replyId);
    res.status(200).json({ message: 'Reply deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get popular questions based on views
exports.getPopularQuestions = async (req, res) => {
  try {
    const popularQuestions = await Question.find().sort({ views: -1 }).limit(5);
    res.status(200).json(popularQuestions);
  } catch (error) {
    console.error("Error fetching popular questions:", error);
    res.status(500).json({ error: 'Failed to fetch popular questions.' });
  }
};

// Get recent questions
exports.getRecentQuestions = async (req, res) => {
  try {
    const recentQuestions = await Question.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json(recentQuestions);
  } catch (error) {
    console.error("Error fetching recent questions:", error);
    res.status(500).json({ error: 'Failed to fetch recent questions.' });
  }
};

// Get all tags
exports.getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: 'Failed to fetch tags.' });
  }
};

// Get all tags
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: 'Failed to fetch tags.' });
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

// Fetch replies for a specific question, sorted by latest first
exports.getRepliesByQuestionId = async (req, res) => {
  try {
    const { questionId } = req.params;
    const replies = await Reply.find({ questionId })
      .sort({ createdAt: -1 }) // Sort by latest replies first
      .populate('userId', 'name email'); // Populate user details if needed

    res.status(200).json(replies);
  } catch (error) {
    console.error('Error fetching replies:', error);
    res.status(500).json({ error: 'Failed to fetch replies' });
  }
};

// Get tags with question count
exports.getTagsWithCount = async (req, res) => {
  try {
    const tags = await Tag.aggregate([
      {
        $lookup: {
          from: 'questions',
          localField: 'name',
          foreignField: 'tags',
          as: 'questions',
        },
      },
      {
        $project: {
          name: 1,
          count: { $size: '$questions' },
        },
      },
    ]);
    res.status(200).json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: 'Failed to fetch tags.' });
  }
};

// Get categories with question count
exports.getCategoriesWithCount = async (req, res) => {
  try {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: 'questions',
          localField: 'name',
          foreignField: 'category',
          as: 'questions',
        },
      },
      {
        $project: {
          name: 1,
          count: { $size: '$questions' },
        },
      },
    ]);
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: 'Failed to fetch categories.' });
  }
};
