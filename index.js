const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Root route
app.get("/", (req, res) => {
  res.send("API is running!");
});

const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

const protectedRoutes = require("./routes/protected");
app.use("/api", protectedRoutes); // Jadi endpointnya: /api/protected

const todoRoutes = require("./routes/todoRoutes");
app.use("/api/todos", todoRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});


