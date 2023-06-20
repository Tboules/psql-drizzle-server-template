import { getTodos, searchTodos, postTodo, putTodo, deleteTodo, } from "./../controllers/todo/index.js";
import { Router } from "express";
const todoRouter = Router();
todoRouter.get("/", getTodos);
todoRouter.get("/:search", searchTodos);
todoRouter.post("/", postTodo);
todoRouter.put("/", putTodo);
todoRouter.delete("/:id", deleteTodo);
export default todoRouter;
//# sourceMappingURL=todo.js.map