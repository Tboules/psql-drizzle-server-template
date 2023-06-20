import { Router } from "express";
import { registerUser } from "../controllers/user/index.js";

const userRouter = Router();

userRouter.post("/register", registerUser);

export default userRouter;
