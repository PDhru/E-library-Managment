const express = require('express');
const { register, login, getCurrentUser } = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();
// const { getCurrentUser } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/current-user', authenticateToken, getCurrentUser);
// router.get('/current-user', authenticateToken, (req, res) => {
//     console.log('Fetching current user...');
//     getCurrentUser(req, res);
//   }); 
  

module.exports = router;
