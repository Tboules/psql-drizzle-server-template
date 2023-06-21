import { ZodError } from "zod";
export const errorHandler = (error, req, res, next) => {
    if (error instanceof ZodError) {
        return res.status(400).send(error.flatten());
    }
    return res.status(400).send(error.message);
};
//# sourceMappingURL=errorHandler.js.map