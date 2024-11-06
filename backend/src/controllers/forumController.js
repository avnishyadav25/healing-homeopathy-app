const Question = require('../models/Question');
const Reply = require('../models/Reply');

// Post a new question
exports.postQuestion = async (req, res) => {
  try {
    const { title, content, tags, userId } = req.body;
    const question = new Question({ title, content, tags, userId });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('userId', 'name').populate('replies');
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Post a reply
exports.postReply = async (req, res) => {
  try {
    const { content, userId } = req.body;
    const { questionId } = req.params;
    const reply = new Reply({ content, userId, questionId });
    await reply.save();

    await Question.findByIdAndUpdate(questionId, { $push: { replies: reply._id } });
    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
