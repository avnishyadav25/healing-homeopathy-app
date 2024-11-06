const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passportConfig');
const path = require('path');
require('dotenv').config();

// Import routes
const blogRoutes = require('./routes/blogRoutes');
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
const companyRoutes = require('./routes/companyRoutes');
const tagRoutes = require('./routes/tagRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const forumRoutes = require('./routes/forumRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Set mongoose strictQuery option
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
  secret: process.env.SESSION_SECRET || '1234567890', // Use environment variable for security
  resave: false,
  saveUninitialized: true,
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/users', userRoutes);
app.use('/blogs', blogRoutes); 
app.use('/media', mediaRoutes);
app.use('/contact', contactUsRoutes);
app.use('/newsletters', newsletterRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/products', productRoutes);
app.use('/comments', commentRoutes);
app.use('/newsletter-users', newsletterUserRoutes);
app.use('/services', serviceRoutes);
app.use('/upload', uploadRoutes);
app.use('/company', companyRoutes);
app.use('/tags', tagRoutes);
app.use('/categories', categoryRoutes);
app.use('/forum', forumRoutes);


// Serve uploaded files statically
app.use('/assets', express.static(path.join(__dirname, '../../web-app/public/assets')));

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
