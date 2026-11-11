const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // Ensures no two users have the same username
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Only allow these two roles
    default: 'user'          // If no role is provided, default to 'user'
  }
});

// Export the model so we can use it in other files
module.exports = mongoose.model('User', userSchema);
