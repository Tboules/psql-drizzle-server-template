import { NextFunction, Request, RequestHandler, Response } from "express";
export default (controller: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, () => {});
    } catch (error) {
      return next(error);
    }
  };
