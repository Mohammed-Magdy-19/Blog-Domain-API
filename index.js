import express from "express"
import morgan from "morgan";
import dotenv from "dotenv";
import connectToDatabase from "./src/Config/db.js";
import userRouter from "./src/Routers/userRouter.js";
import postRouter from "./src/Routers/postRouter.js";
import taskRouter from "./src/Routers/taskRouter.js";

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(morgan("dev"));
app.use(express.json());

connectToDatabase();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/tasks", taskRouter);

app.listen(port);