
const express = require('express');
const router = express.Router();
const {
  createTodo,
  getUserTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");const authenticateToken = require('../middleware/authMiddleware');  

// GET all user todos
router.get("/", authenticateToken, getUserTodos);

// POST create todo
router.post("/", authenticateToken, createTodo);

// PUT update todo
router.put("/:id", authenticateToken, updateTodo);

// DELETE todo
router.delete("/:id", authenticateToken, deleteTodo);

module.exports = router;