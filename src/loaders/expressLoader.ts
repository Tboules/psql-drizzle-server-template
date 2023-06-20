import { errorHandler } from "./../api/middleware/errorHandler.js";
import cors from "cors";
import helmet from "helmet";
import { Express } from "express";
import apiRouter from "../api/routes/index.js";
import bodyParser from "body-parser";

export default (app: Express) => {
  console.log("typescript set up of node js");

  app.use(helmet());
  app.use(cors());
  app.disable("x-powered-by");
  app.use(bodyParser.json());

  app.use("/api", apiRouter);

  app.use(errorHandler);
};
