import { Router } from "express";

import {
  deleteTodo,
  getTodos,
  postTodo,
  putTodo,
  searchTodos,
} from "../controllers/todo/index.js";

const todoRouter = Router();

todoRouter.get("/", getTodos);
todoRouter.get("/:search", searchTodos);
todoRouter.post("/", postTodo);
todoRouter.put("/", putTodo);
todoRouter.delete("/:id", deleteTodo);

export default todoRouter;
