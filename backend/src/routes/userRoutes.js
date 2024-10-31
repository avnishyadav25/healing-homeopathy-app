const express = require('express');
const {
  register,
  login,
  getUsers,
  getUserById,
  updateUser,
  completeRegistration,
  createUser,
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Login and Registration routes
router.post('/login', login);
router.post('/register', register);

// Create new user (admin feature)
router.post('/', authMiddleware, createUser);

// Protected routes for user management
router.get('/', authMiddleware, getUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser); // Update user by ID

// Route to complete registration with additional fields
router.post('/complete-registration', authMiddleware, completeRegistration);

// Route to count the number of registered users
router.get('/count-registered-users', authMiddleware, async (req, res) => {
  try {
    const userCount = await User.countDocuments({});
    res.status(200).json({ count: userCount });
  } catch (error) {
    res.status(500).json({ message: 'Error counting users', error });
  }
});

module.exports = router;
