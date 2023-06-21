import jwt from "jsonwebtoken";
export const authCheck = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, jwtUser) => {
        if (err)
            return res.sendStatus(403);
        //@ts-ignore
        req.user = jwtUser;
        next();
    });
};
//# sourceMappingURL=authCheck.js.map