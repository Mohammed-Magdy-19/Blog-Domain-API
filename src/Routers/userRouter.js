import express from "express"
import { deleteUser, getAllUsers, getUserById, modifyUser } from "../Controllers/userController.js";
import asyncHandler from "express-async-handler";
import { validate } from "../Middleware/validator.js";
import { updateUserSchema } from "../Validators/userValidator.js";


const userRouter = express.Router()

userRouter.get("/", asyncHandler(getAllUsers));
userRouter.get("/:id", asyncHandler(getUserById));
userRouter.delete("/:id", asyncHandler(deleteUser));
userRouter.put("/:id", validate(updateUserSchema) ,asyncHandler(modifyUser));

export default userRouter;