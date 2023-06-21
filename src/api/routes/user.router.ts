import { Router } from "express";
import { login } from "../controllers/user/auth/login.js";
import { registerUser } from "../controllers/user/index.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", login);

export default userRouter;
