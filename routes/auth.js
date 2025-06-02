const express = require("express");
const router = express.Router();

// Import controller
const { registerUser, loginUser } = require("../controllers/authController");

// Route
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
