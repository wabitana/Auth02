const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Step 1: Hash the password (10 is the salt rounds)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 2: Create a new user with the hashed password
    const newUser = new User({
      username: username,
      password: hashedPassword,
      role: role || 'user' 
    });

    // Step 3: Save user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering user. Username might already exist.' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Step 1: Find the user in the database
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Step 2: Compare the plain text password with the hashed password in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Step 3: Generate a JWT (JSON Web Token)
    const token = jwt.sign(
      { 
        userId: user._id, 
        username: user.username,
        role: user.role 
      }, 
      process.env.JWT_SECRET,                        
      { expiresIn: '1h' }                          
    );

    // Step 4: Send the token to the client
    res.json({ message: 'Login successful!', token: token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in' });
  }
};

module.exports = {
  register,
  login
};
