const jwt = require('jsonwebtoken');

// Middleware to protect sensitive routes
function authenticateToken(req, res, next) {
  // Get the token from the "Authorization: Bearer <token>" header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // If no token exists, deny access
  if (!token) {
    return res.status(401).json({ error: 'Access denied! Token missing.' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token!' });
    }

    // Attach decoded user info to the request for the next route handler to use
    req.user = decodedUser;
    next(); // Move to the actual route handler
  });
}

module.exports = authenticateToken;
