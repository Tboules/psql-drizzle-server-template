import { Router } from "express";
import todoRouter from "./todo.js";
import userRouter from "./user.router.js";

const apiRouter = Router();

apiRouter.use("/todos", todoRouter);
apiRouter.use("/user", userRouter);

export default apiRouter;
