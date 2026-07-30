import express from "express"
import { createUser } from "../Controllers/userController.js"
import { login } from "../Auth/login.js";
import asyncHandler from "express-async-handler";
import { validate } from "../Middleware/validator.js";
import { createUserSchema } from "../Validators/userValidator.js";
import { protect } from "../Middleware/authMiddleware.js";

const authRouter = express.Router()

authRouter.post("/register",validate(createUserSchema) ,asyncHandler(createUser));
authRouter.post("/login", asyncHandler(protect) ,asyncHandler(login));

export default authRouter;