const jwt = require("jsonwebtoken");

module.exports = function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: "Token required" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid tokeno" });
    req.user = user;
    next();
  });
};
