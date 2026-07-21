import express from "express"
import { createUser, deleteUser, getAllUsers, getUserById, modifyUser } from "../Controllers/userController.js";


const userRouter = express.Router()

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", createUser);
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id", modifyUser);

export default userRouter;