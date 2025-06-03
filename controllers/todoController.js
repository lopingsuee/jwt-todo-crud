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

exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const email = req.user.email;

  const todo = todos.find((t) => t.id === parseInt(id));

  if (!todo) {
    return errorResponse(res, 404, "Todo not found");
  }

  if (todo.email !== email) {
    return errorResponse(res, 403, "Unauthorized: Not your todo");
  }

  if (title) todo.title = title;
  if (description) todo.description = description;

  return successResponse(res, 200, "Todo updated", todo);
};

exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  const email = req.user.email;

  const index = todos.findIndex((t) => t.id === parseInt(id));
  if (index === -1) {
    return errorResponse(res, 404, "Todo not found");
  }

  if (todos[index].email !== email) {
    return errorResponse(res, 403, "Unauthorized: Not your todo");
  }

  const deleted = todos.splice(index, 1)[0];

  return successResponse(res, 200, "Todo deleted", deleted);
};
