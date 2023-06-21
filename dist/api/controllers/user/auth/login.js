import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { user, userInsertSchema } from "./../../../../db/schema/user.js";
import tryCatch from "../../../../utils/tryCatch.js";
import { db } from "../../../../loaders/drizzleLoader.js";
import { eq } from "drizzle-orm";
const CREDENTIALS_ERROR_MESSAGE = "The credentials you provided are incorrect.";
export const login = tryCatch(async (req, res) => {
    userInsertSchema.parse(req.body);
    const userWithUsername = await db
        .select()
        .from(user)
        .where(eq(user.username, req.body.username));
    if (!userWithUsername.length) {
        throw new Error(CREDENTIALS_ERROR_MESSAGE);
    }
    const incomingUser = userWithUsername[0];
    const isCorrectPassword = await bcrypt.compare(req.body.password, incomingUser.password);
    if (!isCorrectPassword) {
        return res.status(401).send(CREDENTIALS_ERROR_MESSAGE);
    }
    const token = jwt.sign(incomingUser, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).send({ token });
});
//# sourceMappingURL=login.js.map