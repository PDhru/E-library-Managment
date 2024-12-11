const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require('./routes/bookRoutes');
// Initialize app
const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
dotenv.config();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes); 

app.get('/', (req, res) => {
  res.send('Recipe Management API is running...');
});

module.exports = app;
