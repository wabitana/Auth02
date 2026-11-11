const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route: POST /auth/register
router.post('/register', authController.register);

// Route: POST /auth/login
router.post('/login', authController.login);

module.exports = router;
