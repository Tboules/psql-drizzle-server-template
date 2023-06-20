import { Router } from "express";
import todoRouter from "./todo.js";
const apiRouter = Router();
apiRouter.use("/todos", todoRouter);
export default apiRouter;
//# sourceMappingURL=index.js.map