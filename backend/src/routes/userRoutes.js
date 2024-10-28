// /backend/src/routes/userRoutes.js
const express = require('express');
const { register, login, getUsers } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();


// Login and Registration routes
router.post('/login', login);
router.post('/register', register);

// Protected route to get all users (requires authentication)
router.get('/', authMiddleware, getUsers);



router.post('/complete-registration', async (req, res) => {
  const { role, licenseNumber, problem, reason } = req.body;

  try {
    const user = req.user;
    user.role = role;

    if (role === 'Doctor') {
      user.licenseNumber = licenseNumber;
    } else if (role === 'Patient') {
      user.problem = problem;
    } else if (role === 'Customer') {
      user.reason = reason;
    }

    await user.save();
    res.status(200).json({ message: 'Registration completed successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


// Route to count the number of registered users
router.get('/count-registered-users', async (req, res) => {
  try {
    const userCount = await User.countDocuments({});
    res.status(200).json({ count: userCount });
  } catch (error) {
    res.status(500).json({ message: 'Error counting users', error });
  }
});

router.get('/', getUsers);


module.exports = router;
