import express from "express"
import { createUser } from "../Controllers/userController.js"
import { login } from "../Auth/login.js";
import asyncHandler from "express-async-handler";

const authRouter = express.Router()

authRouter.post("/register", asyncHandler(createUser));
authRouter.post("/login", login);

export default authRouter;