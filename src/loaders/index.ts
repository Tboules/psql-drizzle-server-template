import expressLoader from "./expressLoader.js";
import { Express } from "express";

export default function appLoader(app: Express) {
  expressLoader(app);
}
