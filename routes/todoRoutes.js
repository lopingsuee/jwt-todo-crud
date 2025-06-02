
const express = require('express');
const router = express.Router();
const { createTodo, getUserTodos } = require('../controllers/todoController');    
const authenticateToken = require('../middleware/authMiddleware');  

router.post("/todos", authenticateToken, createTodo); // Endpoint untuk membuat todo
router.get("/todos", authenticateToken, getUserTodos); // Read


module.exports = router;