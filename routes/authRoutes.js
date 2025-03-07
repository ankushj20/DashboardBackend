const express = require("express");
const { login, logout, isAuthenticated, dashboard, checkAuth } = require("../controllers/authController");

const router = express.Router();

router.get("/dashboard", isAuthenticated, dashboard);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check-auth", checkAuth);

module.exports = router;
