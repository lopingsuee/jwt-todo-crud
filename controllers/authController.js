const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Sementara: array lokal, nanti pakai database
const users = [];

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { email, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: "User registered successfully" });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Email not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  const token = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET_KEY, // ✅ Gunakan ini agar cocok dengan middleware
    { expiresIn: "1h" }
  );
  

  res.json({ token });
};
