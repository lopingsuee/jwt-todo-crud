
const express = require('express');
const router = express.Router();
const {
  createTodo,
  getUserTodos,
  getTodoById, // tambahkan ini

  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");const authenticateToken = require('../middleware/authMiddleware');  

// GET all user todos
router.get("/", authenticateToken, getUserTodos);
router.get("/:id", authenticateToken, getTodoById);

// POST create todo
router.post("/", authenticateToken, createTodo);

// PUT update todo
router.put("/:id", authenticateToken, updateTodo);

// DELETE todo
router.delete("/:id", authenticateToken, deleteTodo);

module.exports = router;