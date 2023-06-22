import { Router } from "express";
import { authCheck } from "../middleware/authCheck.js";
import todoRouter from "./todo.router.js";
import userRouter from "./user.router.js";

const apiRouter = Router();

apiRouter.use("/todos", authCheck, todoRouter);
apiRouter.use("/user", userRouter);

export default apiRouter;
