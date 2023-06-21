import { user, userInsertSchema } from "../../../../db/schema/user.js";
import tryCatch from "../../../../utils/tryCatch.js";
import bcrypt from "bcrypt";
import { db } from "../../../../loaders/drizzleLoader.js";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
const SALT_ROUNDS = 10;
export const registerUser = tryCatch(async (req, res) => {
    userInsertSchema.parse(req.body);
    const password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const newUser = {
        username: req.body.username,
        password,
        createdAt: new Date(Date.now()),
    };
    const userWithUsername = await db
        .select()
        .from(user)
        .where(eq(user.username, req.body.username));
    console.log(userWithUsername);
    if (userWithUsername.length) {
        throw new Error("this user already exists");
    }
    const registeredUser = await db.insert(user).values(newUser).returning();
    const token = jwt.sign(registeredUser[0], process.env.ACCESS_TOKEN_SECRET);
    res.status(200).send({ token });
    return;
});
//# sourceMappingURL=register.js.map