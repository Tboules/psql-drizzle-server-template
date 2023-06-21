import express from "express";
import appLoader from "./loaders/index.js";
import "dotenv/config";
const app = express();
const port = 3000;
appLoader(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
export default app;
//# sourceMappingURL=app.js.map