// Check if the user is an admin
function authorizeAdmin(req, res, next) {
  // We assume authenticateToken has already run, so req.user exists
  if (req.user && req.user.role === 'admin') {
    next(); // They are an admin, let them proceed
  } else {
    // If they are not an admin, deny access
    res.status(403).json({ error: 'Access denied! Only admins can do this.' });
  }
}

module.exports = authorizeAdmin;
