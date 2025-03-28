const bcrypt = require('bcrypt');

const ADMIN_USER = { 
  username: 'admin',
  password: 'password1234' // hed password
};
exports.isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next(); 
  }
  return res.status(401).json({ message: "Unauthorized" });
};

//  Route
exports.dashboard = (req, res) => {
  res.status(200).json({ message: `Welcome to the dashboard, ${req.session.user.username}!` });
};


exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  console.log(ADMIN_USER.username, ADMIN_USER.password);
  if (username !== ADMIN_USER.username) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  if (password !== ADMIN_USER.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  req.session.user = { username: ADMIN_USER.username }; 
  res.status(200).json({ message: "Login successful" });
};



exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid", { path: "/" }); // ✅ Ensure correct path
    res.status(200).json({ message: "Logout successful" });
  });
};



exports.checkAuth = (req, res) => {
  if (req.session.user) {
    res.status(200).json({ authenticated: true, user: req.session.user });
  } else {
    res.status(401).json({ authenticated: false });
  }
};

