const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Login an existing user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { user: { _id: user._id, name: user.name } }, 
      process.env.JWT_SECRET,
      { expiresIn: '1h' } 
    );
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    // Access the user ID from the decoded token
    const userId = decoded.user._id;
    if (!userId) {
      return res.status(400).json({ message: 'Invalid token: No user ID found' });
    }
    const user = await User.findById(userId);
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ _id: user._id, email: user.email, name: user.name });
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(400).json({ message: 'Invalid token' });
  }
};
