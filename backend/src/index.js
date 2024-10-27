const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passportConfig');
const blogRoutes = require('./routes/blogRoutes'); // Import blog routes
const mediaRoutes = require('./routes/mediaRoutes');
const contactUsRoutes = require('./routes/contactUsRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const commentRoutes = require('./routes/commentRoutes');
const newsletterUserRoutes = require('./routes/newsletterUserRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const uploadRoutes = require('./routes/uploadRoutes');



const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Set the strictQuery option
mongoose.set('strictQuery', false);

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Session configuration
app.use(session({
  secret: '1234567890', // Replace with your secret
  resave: false,
  saveUninitialized: true,
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());


// Routes
// Routes
app.use('/users', userRoutes);
app.use('/blogs', blogRoutes); // Add blog routes
app.use('/media', mediaRoutes);
app.use('/contact', contactUsRoutes);
app.use('/newsletters', newsletterRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/products', productRoutes);
app.use('/blogs', blogRoutes);
app.use('/comments', commentRoutes);
app.use('/newsletter-users', newsletterUserRoutes);
app.use('/services', serviceRoutes);
app.use('/upload', uploadRoutes); // API endpoint for uploads

// Serve uploaded files statically
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', (req, res, next) => {
  console.log(`Serving file: ${req.path}`);
  console.log(path.join(__dirname, 'uploads') +req.path);
  next();
}, express.static(path.join(__dirname, 'uploads')));




// Google OAuth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to role selection page
    res.redirect('/role-selection');
  }
);

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
