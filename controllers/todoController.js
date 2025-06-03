// controllers/todoController.js
const prisma = require("../prisma/client");
const {
  successResponse,
  errorResponse,
} = require("../utils/responseFormatter");

// CREATE TODO
exports.createTodo = async (req, res) => {
  const { title, description } = req.body;
  const email = req.user.email;

  if (!title) {
    return errorResponse(res, 400, "Title is required");
  }

  try {
    const newTodo = await prisma.todo.create({
      data: {
        title,
        description: description || "",
        email,
      },
    });

    return successResponse(res, 201, "Todo created", newTodo);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 500, "Internal server error");
  }
};

// GET ALL TODOS
exports.getUserTodos = async (req, res) => {
  const email = req.user.email;

  try {
    const todos = await prisma.todo.findMany({
      where: { email },
    });

    return successResponse(res, 200, "User's todos fetched", todos);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 500, "Internal server error");
  }
};


// GET TODO BY ID
exports.getTodoById = async (req, res) => {
  const { id } = req.params;
  const email = req.user.email;

  try {
    const todo = await prisma.todo.findFirst({
      where: {
        id: parseInt(id),
        email: email, // hanya todo milik user terkait
      },
    });

    if (!todo) {
      return errorResponse(res, 404, "Todo not found");
    }

    return successResponse(res, 200, "Todo fetched", todo);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 500, "Internal server error");
  }
};

// UPDATE TODO
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const email = req.user.email;

  try {
    const todo = await prisma.todo.findUnique({
      where: { id: parseInt(id) },
    });

    if (!todo) return errorResponse(res, 404, "Todo not found");
    if (todo.email !== email) return errorResponse(res, 403, "Not authorized");

    const updated = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: { title, description },
    });

    return successResponse(res, 200, "Todo updated", updated);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 500, "Internal server error");
  }
};

// DELETE TODO
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  const email = req.user.email;

  try {
    const todo = await prisma.todo.findUnique({
      where: { id: parseInt(id) },
    });

    if (!todo) return errorResponse(res, 404, "Todo not found");
    if (todo.email !== email) return errorResponse(res, 403, "Not authorized");

    await prisma.todo.delete({
      where: { id: parseInt(id) },
    });

    return successResponse(res, 200, "Todo deleted", todo);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 500, "Internal server error");
  }
};
