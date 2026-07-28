import express from "express"
import { deleteUser, getAllUsers, getUserById, modifyUser } from "../Controllers/userController.js";
import asyncHandler from "express-async-handler";


const userRouter = express.Router()

userRouter.get("/", asyncHandler(getAllUsers));
userRouter.get("/:id", asyncHandler(getUserById));
userRouter.delete("/:id", asyncHandler(deleteUser));
userRouter.put("/:id", asyncHandler(modifyUser));

export default userRouter;