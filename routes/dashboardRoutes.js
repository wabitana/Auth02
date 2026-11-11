const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeAdmin = require('../middleware/adminMiddleware');

// Route: GET /dashboard -- Anyone logged in can access
router.get('/', authenticateToken, dashboardController.getDashboard);

// Route: GET /dashboard/admin -- Only admins can access
// Notice how we use two middlewares here! 
// 1st: Check if they are logged in
// 2nd: Check if they are an admin
router.get('/admin', authenticateToken, authorizeAdmin, (req, res) => {
  res.json({ message: 'Welcome to the secret admin area!' });
});

module.exports = router;
