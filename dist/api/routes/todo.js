import { getTodos, searchTodos, postTodo, putTodo, deleteTodo, } from "./../controllers/todo/index.js";
import { Router } from "express";
import { authCheck } from "../middleware/authCheck.js";
const todoRouter = Router();
todoRouter.get("/", authCheck, getTodos);
todoRouter.get("/:search", authCheck, searchTodos);
todoRouter.post("/", authCheck, postTodo);
todoRouter.put("/", authCheck, putTodo);
todoRouter.delete("/:id", authCheck, deleteTodo);
export default todoRouter;
//# sourceMappingURL=todo.js.map