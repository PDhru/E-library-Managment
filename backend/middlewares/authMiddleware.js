const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from headers
  if (!token) {
    console.error('No token provided.');
    return res.status(401).json({ message: 'No token, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
    console.log('Decoded Token:', decoded); // Debugging: Log the decoded token

    // Adjusted to match your token's payload structure
    const userId = decoded.user?._id;
    if (!userId) {
      console.error('Token does not contain user ID.');
      return res.status(401).json({ message: 'Invalid token structure.' });
    }

    req.user = await User.findById(userId); // Find user by ID from the token
    if (!req.user) {
      console.error('User not found:', userId); // Debugging: Log missing user ID
      return res.status(401).json({ message: 'User not found.' });
    }

    console.log('Authenticated User:', req.user); // Debugging: Log the authenticated user
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token verification error:', error); // Debugging: Log token verification errors
    return res.status(401).json({ message: 'Invalid token, authorization denied.' });
  }
};

const authenticateUser = async (req, res, next) => {
  // Extract the token from Authorization header (Bearer <token>)
  const token = req.header('Authorization')?.split(' ')[1]; 

  // If there's no token, send an unauthorized response
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    console.log('Decoding token:', token); // Log token for debugging purposes

    // Verify the token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('Decoded user:', decoded); // Log decoded user data

    // Attach the decoded user to the request object for use in subsequent routes
    req.user = decoded; 

    // Call the next middleware or route handler
    next();
  } catch (err) {
    console.error('Token verification error:', err); // Log error if token verification fails
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = {
  authMiddleware, 
  authenticateUser,
};
