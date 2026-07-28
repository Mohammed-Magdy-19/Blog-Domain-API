import express from "express"
import morgan from "morgan";
import dotenv from "dotenv";
import connectToDatabase from "./src/Config/db.js";
import userRouter from "./src/Routers/userRouter.js";
import postRouter from "./src/Routers/postRouter.js";
import taskRouter from "./src/Routers/taskRouter.js";
import authRouter from "./src/Routers/authRouter.js";
import { errorHandlingMiddleware } from "./src/Middleware/errorHandlingMiddleware.js";
import asyncHandler from "express-async-handler"

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(morgan("dev"));
app.use(express.json());

connectToDatabase();

app.use("/api/v1/users", asyncHandler(userRouter));
app.use("/api/v1/posts", asyncHandler(postRouter));
app.use("/api/v1/tasks", asyncHandler(taskRouter));
app.use("/api/v1/auth", authRouter);
app.use(errorHandlingMiddleware);

app.listen(port);