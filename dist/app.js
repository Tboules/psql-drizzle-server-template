import express from "express";
import appLoader from "./loaders/index.js";
const app = express();
const port = 3000;
appLoader(app);
// async function insertDummyData() {
//   await db.insert(todo).values({
//     title: "todo 2",
//     body: "testing another input into the db",
//     createdAt: new Date(Date.now()),
//     updatedAt: new Date(Date.now()),
//     status: "created",
//   });
// }
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
export default app;
//# sourceMappingURL=app.js.map