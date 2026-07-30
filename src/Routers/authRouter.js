import express from "express"
import rateLimit from "express-rate-limit"
import { createUser } from "../Controllers/userController.js"
import { login } from "../Auth/login.js";
import asyncHandler from "express-async-handler";
import { validate } from "../Middleware/validator.js";
import { createUserSchema } from "../Validators/userValidator.js";

const authRouter = express.Router()

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        status: 429,
        error: "Too many authentication attempts, please try again later."
    }
});

authRouter.use(authLimiter);

authRouter.post("/register", validate(createUserSchema), asyncHandler(createUser));
authRouter.post("/login", asyncHandler(login));

export default authRouter;