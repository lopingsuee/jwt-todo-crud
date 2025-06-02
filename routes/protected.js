const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");

router.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: `Hello ${req.user.email}, you accessed protected data!`,
  });
});

module.exports = router;
