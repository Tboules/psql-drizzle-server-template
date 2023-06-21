import { User } from "./db/schema/user.js";

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
