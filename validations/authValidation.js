const { z } = require("zod");

const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(1, { message: "Password is required" }),
});

module.exports = { registerSchema, loginSchema };
