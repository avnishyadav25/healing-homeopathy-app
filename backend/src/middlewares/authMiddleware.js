// src/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
 
const authMiddleware = (req, res, next) => {
  //console.log('## req header', req.header('Authorization'));
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
