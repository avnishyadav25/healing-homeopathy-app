// /backend/src/routes/userRoutes.js
const express = require('express');
const { register } = require('../controllers/userController');
const { login } = require('../controllers/userController');
const { getUsers } = require('../controllers/userController');

const router = express.Router();

// Login route
router.post('/login', login);

// Registration route
router.post('/register', register);


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
