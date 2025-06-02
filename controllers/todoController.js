// controllers/todoController.js
const {
  successResponse,
  errorResponse,
} = require("../utils/responseFormatter");


let todos = []; // Simpan sementara (nanti pakai DB)

exports.createTodo = (req, res) => {
  const { title, description } = req.body;
  const userEmail = req.user.email;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTodo = {
    id: todos.length + 1,
    title,
    description: description || "",
    email: userEmail,
  };

  todos.push(newTodo);
  res.status(201).json({ message: "Todo created", todo: newTodo });
};

exports.getUserTodos = (req, res) => {
  const email = req.user.email;
  const userTodos = todos.filter((todo) => todo.email === email);

  return successResponse(res, 200, "User's todos fetched", userTodos);
};
