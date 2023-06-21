import {
  getTodos,
  searchTodos,
  postTodo,
  putTodo,
  deleteTodo,
} from "./../controllers/todo/index.js";
import { Router } from "express";
import { authCheck } from "../middleware/authCheck.js";

const todoRouter = Router();

todoRouter.get("/", authCheck, getTodos);
todoRouter.get("/:search", searchTodos);
todoRouter.post("/", postTodo);
todoRouter.put("/", putTodo);
todoRouter.delete("/:id", deleteTodo);

export default todoRouter;
