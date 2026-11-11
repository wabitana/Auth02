const getDashboard = (req, res) => {
  // We can access req.user here because our middleware attached it
  res.json({ 
    message: `Welcome to the protected dashboard, ${req.user.username}!`,
    userId: req.user.userId
  });
};

module.exports = {
  getDashboard
};
