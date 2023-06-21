import { User } from "../db/schema/user.js";
import { Request } from "express";

export interface RequestWithUser extends Request {
  user?: User;
}
