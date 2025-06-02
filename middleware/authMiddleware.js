const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Ambil token dari header Authorization
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  // Verifikasi token
  console.log("Token:", token);
  console.log("Secret Key:", process.env.JWT_SECRET_KEY);

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.error("JWT Verify Error:", err.message);
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // Simpan data user ke req agar bisa dipakai route berikutnya
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
