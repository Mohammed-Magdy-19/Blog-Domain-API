import express from "express"
import { createUser } from "../Controllers/userController.js"
import { login } from "../Auth/login.js";

const authRouter = express.Router()

authRouter.post("/register", createUser);
authRouter.post("/login", login);

export default authRouter;